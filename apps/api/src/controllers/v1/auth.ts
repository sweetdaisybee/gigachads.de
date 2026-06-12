import { tCreateAuthBody } from "@gigachads.de/shared/schemas/v1";
import { RepositoryUsers } from "@repositoriesV1/users.js";
import { FastifyReply, FastifyRequest } from "fastify";
import argon2 from "argon2";
import { env } from "@configs/index.js";
import { server } from "@index";
import { FactoryErrors } from "@factoriesV1/index.js";

export class ControllerAuth {
  private readonly repoUsers: RepositoryUsers;
  private readonly factErrors: FactoryErrors;
  constructor() {
    this.repoUsers = new RepositoryUsers();
    this.factErrors = new FactoryErrors();
  }
  //--------------------------------------------POST---------------------------------------------//
  public readonly login = async(
    request: FastifyRequest<{
      Body: tCreateAuthBody
    }>,
    reply: FastifyReply
  ) => {
    const body: tCreateAuthBody = request.body;
    const user = await this.repoUsers.getByEmail({
      search: {
        email: body.email
      },
      query: {
        withPassword: true
      }
    });
    const dummyHash = "$argon2id$v=19$m=65536,t=3,p=4$5P71+rkkfsHUw4Y4yKK2hg$B6QhQ1JjnnpM8xfhKXj5SS76B/ePrrmsKNsQb5Q/iNg";
    const hash = user?.getPassword()?.hash ?? dummyHash
    const hashCheck = await argon2.verify(hash, body.password);
    if (!user || !hashCheck) {
      const error = this.factErrors.createUnauthorized(
        "Invalid email or password"
      );
      throw error;
    }
    const userEmail = user.getEmail();
    reply.setCookie(env.COOKIE_NAME, server.jwt.sign({
      email: userEmail 
    }));
    return reply.default({
      meta: {
        statusCode: 201,
        status: "Created",
        message: `Logged in`,
      },
      data: null
    });
  };
  //------------------------------------------DELETE---------------------------------------------//
  public readonly logout = async(
    _request: FastifyRequest,
    reply: FastifyReply
  ) => {
    reply.clearCookie(env.COOKIE_NAME);
    return reply.default({
      meta: {
        statusCode: 200,
        status: "Ok",
        message: `Logged out`,
      },
      data: null
    })
  };
};
