import { Model } from "@vuex-orm/core";
import Fetcher from "@/utils/fetch";
import Collections from "@vuex-orm/core/lib/data/Collections";

export default class User extends Model {
  static entity = "users";
  static primaryKey = "@id";

  static fields() {
    return {
      "@id": this.string(null,),
      email: this.string("")
    };
  }

  static fetcher = new Fetcher("http://api.chat.local/users",);

  static findAll(): Promise<Collections> {
    return new Promise(resolve => {
      this.fetcher.get().then(data => {
        // @ts-ignore
        User.insertOrUpdate({data: data["hydra:member"]}).then(resolve);
      });
    });
  }
}
