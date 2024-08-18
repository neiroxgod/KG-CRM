import {
  useFetchApi,
  type IIdentityWithRelations,
  type ITasks,
} from "#imports";
import { useAuthStore } from "#imports";
import type { IFiles, IUser, IUserWithRelations } from "./interfaces";

export class CRM_API {
  private userStore = useAuthStore();
  private fetchApi = useFetchApi(this.userStore.token);

  private employersInstance = new Employers(this.fetchApi);
  private filialsInstance = new Filials(this.fetchApi);
  private usersInstance = new Users(this.fetchApi);
  private groupsInstance = new Groups(this.fetchApi);
  private tasksInstance = new Tasks(this.fetchApi);
  private filesInstance = new Files(this.fetchApi);
  private rolesInstance = new Roles(this.fetchApi);

  /**
   * Initializes a new instance of the CRM_API class.
   *
   * @description Instantiates the employers, filials, users, groups, tasks, files, and roles instances.
   * @return {undefined} No return value.
   */
  constructor() {
    this.employersInstance = new Employers(this.fetchApi);
    this.filialsInstance = new Filials(this.fetchApi);
    this.usersInstance = new Users(this.fetchApi);
    this.groupsInstance = new Groups(this.fetchApi);
    this.tasksInstance = new Tasks(this.fetchApi);
    this.filesInstance = new Files(this.fetchApi);
    this.rolesInstance = new Roles(this.fetchApi);
  }

  /**
   * Returns the Employers instance associated with this CRM_API instance.
   *
   * @return {Employers} The Employers instance.
   */
  get employers(): Employers {
    return this.employersInstance;
  }

  /**
   * Returns the Filials instance associated with this CRM_API instance.
   *
   * @return {Filials} The Filials instance.
   */
  get filials(): Filials {
    return this.filialsInstance;
  }

  /**
   * Returns the Users instance associated with this CRM_API instance.
   *
   * @return {Users} The Users instance.
   */
  get users(): Users {
    return this.usersInstance;
  }
  /**
   * Returns the Groups instance associated with this CRM_API instance.
   *
   * @return {Groups} The Users instance.
   */
  get groups(): Groups {
    return this.groupsInstance;
  }
  /**
   * Returns the Tasks instance associated with this CRM_API instance.
   *
   * @return {Tasks} The Users instance.
   */
  get tasks(): Tasks {
    return this.tasksInstance;
  }
  /**
   * Returns the Files instance associated with this CRM_API instance.
   *
   * @return {Files} The Users instance.
   */
  get files(): Files {
    return this.filesInstance;
  }
  /**
   * Returns the Roles instance associated with this CRM_API instance.
   *
   * @return {Roles} The Users instance.
   */
  get roles(): Roles {
    return this.rolesInstance;
  }
}

class Employers {
  constructor(private fetchApi: ReturnType<typeof useFetchApi>) {}

  public async getList(
    withRelations = false
  ): Promise<IIdentityWithRelations[] | IUserWithRelations[]> {
    if (withRelations === true) {
      return (await this.fetchApi("/users/employers/list", {
        method: "GET",
      })) as IIdentityWithRelations[];
    } else {
      const list = (await this.fetchApi("/users/employers/list", {
        method: "GET",
      })) as IIdentityWithRelations[];

      const result = list.map((item) => {
        return {
          ...item.user,
        };
      });

      return result;
    }
  }

  public async getById(id: number): Promise<IIdentityWithRelations> {
    return (await this.fetchApi(`/users/get/${id}`, {
      method: "GET",
    })) as IIdentityWithRelations;
  }

  public async create(data: IUser): Promise<IIdentityWithRelations> {
    return (await this.fetchApi("/users/add", {
      method: "POST",
      body: { ...data },
    })) as IIdentityWithRelations;
  }

  public async update(
    id: number,
    data: IUser
  ): Promise<IIdentityWithRelations> {
    console.log(data);
    return (await this.fetchApi(`/users/edit`, {
      method: "PATCH",
      body: { ...data },
    })) as IIdentityWithRelations;
  }

  public async delete(id: number): Promise<void> {
    await this.fetchApi(`/employers/${id}`, {
      method: "DELETE",
    });
  }
}

class Users {
  constructor(private fetchApi: ReturnType<typeof useFetchApi>) {}

  public async getList(): Promise<IIdentityWithRelations[]> {
    return (await this.fetchApi("/users", {
      method: "GET",
    })) as IIdentityWithRelations[];
  }

  public async getById(id: number): Promise<IIdentityWithRelations> {
    return (await this.fetchApi(`/users/get/${id}`, {
      method: "GET",
    })) as IIdentityWithRelations;
  }

  public async create(data: IUser): Promise<IIdentityWithRelations> {
    return (await this.fetchApi("/users", {
      method: "POST",
      body: data,
    })) as IIdentityWithRelations;
  }

  public async update(
    id: number,
    data: IUser
  ): Promise<IIdentityWithRelations> {
    return (await this.fetchApi(`/users/${id}`, {
      method: "PATCH",
      body: data,
    })) as IIdentityWithRelations;
  }

  public async delete(id: number): Promise<void> {
    await this.fetchApi(`/users/delete/${id}`, {
      method: "DELETE",
    });
  }
}

class Groups {
  constructor(private fetchApi: ReturnType<typeof useFetchApi>) {}

  public async getList() {
    return await this.fetchApi("/groups", {
      method: "GET",
    });
  }

  public async getById(id: number) {
    return await this.fetchApi(`/groups/${id}`, {
      method: "GET",
    });
  }

  public async create(data: any) {
    return await this.fetchApi("/groups", {
      method: "POST",
      body: data,
    });
  }

  public async update(id: number, data: any) {
    return await this.fetchApi(`/groups/${id}`, {
      method: "PATCH",
      body: data,
    });
  }

  public async delete(id: number) {
    return await this.fetchApi(`/groups/${id}`, {
      method: "DELETE",
    });
  }

  public async getGroupUsers(id: number) {
    return await this.fetchApi(`/groups/${id}/users`, {
      method: "GET",
    });
  }
}

class Tasks {
  constructor(private fetchApi: ReturnType<typeof useFetchApi>) {}

  public async getList(): Promise<ITasks[]> {
    return (await this.fetchApi("/tasks", {
      method: "GET",
    })) as ITasks[];
  }

  public async getById(id: number): Promise<ITasks> {
    return (await this.fetchApi(`/tasks/${id}`, {
      method: "GET",
    })) as ITasks;
  }

  public async create(data: ITasks): Promise<ITasks> {
    return (await this.fetchApi("/tasks", {
      method: "POST",
      body: data,
    })) as ITasks;
  }

  public async update(id: number, data: ITasks): Promise<ITasks> {
    return (await this.fetchApi(`/tasks/edit/`, {
      method: "PATCH",
      body: { id, ...data },
    })) as ITasks;
  }

  public async delete(id: number): Promise<void> {
    await this.fetchApi(`/tasks/delete/${id}`, {
      method: "DELETE",
    });
  }

  public async getTasksByUserId(id: number): Promise<ITasks[]> {
    return (await this.fetchApi(`/tasks/get/user/${id}`, {
      method: "GET",
    })) as ITasks[];
  }
}

class Files {
  constructor(private fetchApi: ReturnType<typeof useFetchApi>) {}

  public async downloadFile(id: number): Promise<Blob> {
    return (await this.fetchApi(`/files/download${id}`, {
      method: "GET",
    })) as Blob;
  }

  public async getById(id: number): Promise<IFiles> {
    return (await this.fetchApi(`/files/${id}`, {
      method: "GET",
    })) as IFiles;
  }

  public async create(data: IFiles): Promise<IFiles> {
    return (await this.fetchApi("/files", {
      method: "POST",
      body: data,
    })) as IFiles;
  }

  public async delete(id: number): Promise<void> {
    await this.fetchApi(`/files/delete/${id}`, {
      method: "DELETE",
    });
  }

  public async getFilesByUserId(id: number) {
    return await this.fetchApi(`/files/get/user/${id}`, {
      method: "GET",
    });
  }
}

class Roles {
  constructor(private fetchApi: ReturnType<typeof useFetchApi>) {}

  public async getList(): Promise<IRoles[]> {
    return (await this.fetchApi("/roles", {
      method: "GET",
    })) as IRoles[];
  }

  public async getById(id: number): Promise<IRoles> {
    return (await this.fetchApi(`/roles/${id}`, {
      method: "GET",
    })) as IRoles;
  }

  public async create(data: any): Promise<IRoles> {
    return (await this.fetchApi("/roles", {
      method: "POST",
      body: data,
    })) as IRoles;
  }

  public async update(id: number, data: any): Promise<IRoles> {
    return (await this.fetchApi(`/roles/${id}`, {
      method: "PATCH",
      body: data,
    })) as IRoles;
  }

  public async delete(id: number): Promise<void> {
    await this.fetchApi(`/roles/${id}`, {
      method: "DELETE",
    });
  }

  public async getRolesByUserId(id: number): Promise<IRoles[]> {
    return (await this.fetchApi(`/roles/user/${id}`, {
      method: "GET",
    })) as IRoles[];
  }
}

class Filials {
  constructor(private fetchApi: ReturnType<typeof useFetchApi>) {}

  public async getList(): Promise<IFilial[]> {
    return (await this.fetchApi("/filials", {
      method: "GET",
    })) as IFilial[];
  }

  public async getById(id: number): Promise<IFilial> {
    return (await this.fetchApi(`/filials/${id}`, {
      method: "GET",
    })) as IFilial;
  }

  public async create(data: IFilial): Promise<IFilial> {
    return (await this.fetchApi("/filials", {
      method: "POST",
      body: data,
    })) as IFilial;
  }

  public async update(id: number, data: IFilial): Promise<IFilial> {
    return (await this.fetchApi(`/filials/${id}`, {
      method: "PATCH",
      body: data,
    })) as IFilial;
  }

  public async delete(id: number): Promise<void> {
    await this.fetchApi(`/filials/${id}`, {
      method: "DELETE",
    });
  }
}
