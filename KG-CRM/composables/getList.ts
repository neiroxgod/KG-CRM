import { useFetchApi, type IEmployer } from "#imports";
import { useAuthStore } from "#imports";

export class getList {
  private userStore = useAuthStore();
  private fetchApi = useFetchApi(this.userStore.token);

  async employers(): Promise<[globalThis.IEmployer]> {
    return (await this.fetchApi("/employers/", {
      method: "GET",
    })) as [IEmployer];
  }

  async employerById(id: number): Promise<globalThis.IEmployer> {
    return (await this.fetchApi("/employers/get/" + id, {
      method: "GET",
    })) as IEmployer;
  }

  async users() {
    return await this.fetchApi("/users/", {
      method: "GET",
    });
  }

  async usersById(user_id: number) {
    return await this.fetchApi("/users/" + user_id, {
      method: "GET",
    });
  }

  async groups() {
    return await this.fetchApi("/groups/", {
      method: "GET",
    });
  }

  async groupUsers(group_id: number) {
    return await this.fetchApi("/groupUser/list" + group_id, {
      method: "GET",
    });
  }

  async tasks() {
    return await this.fetchApi("/tasks/", {
      method: "GET",
    });
  }

  async filesById(id: number) {
    return await this.fetchApi("/files/" + id, {
      method: "GET",
    });
  }

  async filesByUserId(user_id: number) {
    return await this.fetchApi("/files/" + user_id, {
      method: "GET",
    });
  }

  async filesByEmployerId(employer_id: number) {
    return await this.fetchApi("/files/" + employer_id, {
      method: "GET",
    });
  }
}
