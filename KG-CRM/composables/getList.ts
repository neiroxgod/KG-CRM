import { useFetchApi, type IEmployer, type ITasks } from "#imports";
import { useAuthStore } from "#imports";

export class getList {
  private userStore = useAuthStore();
  private fetchApi = useFetchApi(this.userStore.token);

  /**
   * Retrieves a list of employers from the API.
   *
   * @return {[globalThis.IIdentityWithRelations]} An array of employer objects.
   */

  async employers(
    withIdentity = false
  ): Promise<globalThis.IEmployer[] | IIdentityWithRelations[]> {
    const list = (await this.fetchApi("/users/employers/list", {
      method: "GET",
    })) as IIdentityWithRelations[];
    if (!withIdentity) return list.map((item) => item.user);
    return list;
  }

  async employerById(id: number): Promise<globalThis.IEmployer> {
    return (await this.fetchApi("/users/get/" + id, {
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

  async tasks(): Promise<[globalThis.ITasks]> {
    return (await this.fetchApi("/tasks/", {
      method: "GET",
    })) as [ITasks];
  }
  async tasksByUserId(userId: number): Promise<[globalThis.ITasks]> {
    return (await this.fetchApi(`/tasks/get/user/${userId}`, {
      method: "GET",
    })) as [ITasks];
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
