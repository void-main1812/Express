import express, { Request, Response } from "express";

const app = express();

app.use(express.json()); //NOTE - This is important to parse the request body in JSON format
app.use(express.urlencoded({ extended: true })); //NOTE - This is important to parse the request body in URL encoded format

// app.get("/", (req: Request, res: Response) => {         //NOTE - This is a sample GET request
//   return res.redirect("https://talk-box.vercel.app/");
// });

// app.all("/api/all", (req: Request, res: Response) => {  //NOTE - This is a sample request for all methods
//   return res.sendStatus(200);
// });

// app.post("/api/data", (req: Request, res: Response) => {//NOTE - This is a sample POST request
//   console.log(req.body);
//   return res.sendStatus(200);
// });

// NOTE - This is a sample chaining of routes
app
  .route("/")
  .get((req: Request, res: Response) => {
    return res.send("You made a GET Request");
  })
  .post((req: Request, res: Response) => {
    return res.send("You made a Post Request");
  })
  .put((req: Request, res: Response) => {
    return res.send("You made a PUT Request");
  });

//NOTE - This is the port on which the server will run
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
