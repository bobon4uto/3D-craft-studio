import { WebSocket } from "ws";
const server = new WebSocket.Server({ port: 8080 });

import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entity/User3";
import * as fs from "fs";

// Load configuration from ormconfig.json
const config = JSON.parse(fs.readFileSync("ormconfig.json", "utf-8"));

// Create a new DataSource instance
const AppDataSource = new DataSource(config);

// Initialize the DataSource
AppDataSource.initialize()
  .then(async () => {
    console.log("Connected to PostgreSQL database!");

    // Your application logic here
    // Example: Create a new user
    const userRepository = AppDataSource.getRepository(User);
    // Fetch all users
    const users = await userRepository.find();
    console.log("All users: ", users);
  })
  .catch((error) => console.log("Error: ", error));

server.on("connection", (socket: WebSocket) => {
  console.log("New client connected");

  socket.on("message", async (message: string) => {
    let user: User3D;
    let mmm: Mess3D;
    let userl: UserLogin = {
      login: "0",
      password: "0",
    };
    try {
      mmm = JSON.parse(message);
      if (mmm.type === typeof userl) {
        userl = mmm.mess;

        const userRepository = AppDataSource.getRepository(User);
        // Fetch all users
        const users = await userRepository
          .findOne({
            where: { login: userl.login, password: userl.password },
          })
          .then((users) => {
            console.log("user with specified login: ", users);
            user = {
              username: users?.email || "none",
              id: users?.id || 0,
              online: true,
            };
            console.log(`Received: ${user.username}`);
            // Echo the message back to the client

            const m: Mess3D = {
              type: typeof user,
              mess: user,
            };
            socket.send(JSON.stringify(m));
          });
      }
      if (mmm.type === "reg") {
        userl = mmm.mess;

        const userRepository = AppDataSource.getRepository(User);
        // Fetch all users
        const userindb: User = new User(
          userl.login,
          userl.login,
          userl.password,
        );
        const users = await userRepository.insert(userindb);
        const usrtmp: User = { id: 0, login: "!", email: "!", password: "!" };
        const u: User =
          (await userRepository.findOne({
            where: { login: userl.login, password: userl.password },
          })!) || usrtmp;
        const usr: User3D = {
          id: u.id,
          username: u.email,
          online: true,
        };
        const m: Mess3D = {
          type: typeof usr,
          mess: usr,
        };
        socket.send(JSON.stringify(m));
      }
    } catch {
      user = {
        username: "none",
        id: 0,
        online: false,
      };
    }
  });

  socket.on("close", () => {
    console.log("Client disconnected");
  });
});

console.log("WebSocket server is running on ws://localhost:8080");
