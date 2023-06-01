import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Wilder } from "../entity/wilder";
import dataSource from "../utils";
import { Subscription, Root } from "type-graphql";

@Resolver(Wilder)
export class WilderResolver {
  @Query(() => [Wilder])
  async getAllWilders(): Promise<Wilder[]> {
    return await dataSource.manager.find(Wilder, {
      relations: {
        grades: {
          skill: true,
        },
      },
    });
  }

  @Mutation(() => Wilder)
  async createWilder(@Arg("name") name: string): Promise<Wilder> {
    const newWilder = new Wilder();
    newWilder.name = name;
    const wilderFromDB = await dataSource.manager.save(Wilder, newWilder);
    console.log(wilderFromDB);
    return wilderFromDB;
  }

  // a mutation to delete a wilder
  @Mutation(() => Boolean)
  async deleteWilder(@Arg("id") id: number): Promise<boolean> {
    const wilder = await dataSource.manager.findOne(Wilder, { where: { id } });
    if (!wilder) {
      return false;
    }
    await dataSource.manager.remove(Wilder, wilder);
    return true;
  }

  // a mutation to update a wilder
  @Mutation(() => Wilder)
  async updateWilder(
    @Arg("id") id: number,
    @Arg("name") name: string
  ): Promise<Wilder | null> {
    const wilder = await dataSource.manager.findOne(Wilder, { where: { id } });
    if (!wilder) {
      return null;
    }
    wilder.name = name;
    await dataSource.manager.save(Wilder, wilder);
    return wilder;
  }

  // add subscription to wilder resolver
  @Subscription(() => Wilder, {
    topics: "WILDER_ADDED",
  })
  wilderAdded(@Root() wilder: Wilder): Wilder {
    console.log("subsriotopnnnn" + wilder);
    return wilder;
  }
}
