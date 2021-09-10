import app from "./app";

app.listen({ port: process.env.PORT }, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`);
});

process.on('uncaughtException', err => {
    console.error('There was an uncaught error', err);
    process.exit(1);
});