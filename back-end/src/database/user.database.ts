import { PictochatUser } from "../domain/user/user.model";

export class UserRepository {
  private static readonly _db: PictochatUser[] = [];
  
  public constructor() {}

  public addUser(user: PictochatUser): void {
    UserRepository._db.push(user);
  }

  public getUsers(): PictochatUser[] {
    return UserRepository._db;
  }

  public getUserByCriteria(criteria: (user: PictochatUser) => boolean): PictochatUser | undefined {
    return UserRepository._db.find(criteria);
  }
}
