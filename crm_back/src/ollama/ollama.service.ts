import { Injectable } from '@nestjs/common';
import { Ollama, OllamaEmbeddings } from '@langchain/ollama';
import { DirectoryLoader } from 'langchain/document_loaders/fs/directory';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { FaissStore } from '@langchain/community/vectorstores/faiss';
import { RetrievalQAChain } from 'langchain/chains';
import { PromptTemplate } from '@langchain/core/prompts';
import {
  JSONLoader,
  JSONLinesLoader,
} from 'langchain/document_loaders/fs/json';
import { BaseRetrieverInterface } from '@langchain/core/retrievers';
import { TextLoader } from 'langchain/document_loaders/fs/text';

@Injectable()
export class OllamaService {
  private llm: Ollama;
  private chain: RetrievalQAChain;
  constructor() {
    this.llm = new Ollama({
      model: 'llama3.1',
      temperature: 0.7,
      maxRetries: 3,
    });
  }

  async initRag() {
    // 1. Загрузка кода проекта
    const loader = new DirectoryLoader('../KG-CRM/components', {
      '.ts': (path) => new TextLoader(path),
      '.vue': (path) => new TextLoader(path),
      '.md': (path) => new TextLoader(path),
      '.js': (path) => new TextLoader(path),
    });

    const documents = await loader.load();

    // 2. Разделение кода на меньшие части
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });
    const docs = await textSplitter.splitDocuments(documents);

    // 3. Создание встраиваний и индексация данных
    const embeddings = new OllamaEmbeddings({
      model: 'llama3.1',
    });
    const vectorstore = await FaissStore.fromDocuments(docs, embeddings);

    // 4. Создание цепочки RAG с Ollama
    const retriever: BaseRetrieverInterface<Record<string, any>> =
      vectorstore.asRetriever();
    const prompt = PromptTemplate.fromTemplate(
      `This context contains Vue code and components. Answer the question based only on the following context:
      {context}

      Question: {question}`,
    );

    this.chain = RetrievalQAChain.fromLLM(this.llm, retriever, {
      prompt, // Передаем prompt в options
    });
  }

  async askOllama(userRequest: string, useContext = true) {
    if (useContext) {
      console.log(this.chain);
      if (!this.chain) {
        await this.initRag();
      }

      return await this.chain.run(userRequest);
    } else {
      return await this.llm.invoke(userRequest);
    }
  }
}
