import express from "express";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { z } from "zod";
import { createPost, getPosts } from "./mcp.tool.js";

const server = new McpServer({
    name: "example-server",
    version: "1.0.0"
});

const app = express();

server.tool(
    "addTwoNumbers",
    "Add two numbers",
    {
        a: z.number(),
        b: z.number(),
    },
    async (args) => {
        const { a, b } = args;
        return {
            content: [
                {
                    type: "text",
                    text: `The sum of ${a} and ${b} is ${a + b}`,
                }
            ]
        }
    }
);

server.tool(
    "createPost", 
    "Create a post on X formally known as Twitter", 
    {
        status: z.string(),
    }, 
    async (args) => {
        const { status } = args;
        return createPost(status);
    }
);

server.tool(
    "getPosts",
    "Get my latest posts from X formally known as Twitter",
    {},
    async (args) => {
        return getPosts();
    }
)

const transports = {};

app.get("/sse", async (req, res) => {
    const transport = new SSEServerTransport('/messages', res);
    transports[ transport.sessionId ] = transport;
    res.on("close", () => {
        delete transports[ transport.sessionId ];
    });
    await server.connect(transport);
});

app.post("/messages", async (req, res) => {
    const sessionId = req.query.sessionId;
    const transport = transports[ sessionId ];
    if (transport) {
        await transport.handlePostMessage(req, res);
    } else {
        res.status(400).send('No transport found for sessionId');
    }
});

app.listen(3001, () => {
    console.log("Server is running on http://localhost:3001");
});