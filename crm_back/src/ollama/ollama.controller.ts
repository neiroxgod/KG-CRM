import { Body, Controller, Post } from '@nestjs/common';
import { OllamaService } from './ollama.service';

@Controller('ollama')
export class OllamaController {
  constructor(private readonly ollamaService: OllamaService) {}

  @Post('query')
  async query(@Body() body: { userRequest: string }) {
    const completion = await this.ollamaService.askOllama(body.userRequest);
    return { response: completion };
  }
}
