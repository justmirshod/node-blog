const express = require("express");
const expressEdge = require("express-edge");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const homePageController = require("./controllers/homePage");
const aboutController = require("./controllers/about");
const contactController = require("./controllers/contact");
const getPostController = require("./controllers/getPost");
const postsNewsController = require("./controllers/postsNew");
const postsCreateController = require("./controllers/postsCreate");
const createUserController = require("./controllers/createUser");
const storeUserController = require("./controllers/userStore");
const loginController = require("./controllers/login");
const loginStoreController = require("./controllers/loginStore");
const expressSession = require("express-session");
const mongoStore = require("connect-mongo");
const connectFlash = require("connect-flash");
const logoutController = require("./controllers/logout");

const validateCreatePostMiddleware = require("./middleware/validatingMiddleware");
const authMiddleware = require("./middleware/auth");
const redirectIfAuth = require("./middleware/redirect");

const app = express();

const databaseUrl =
  "mongodb+srv://Misha:mirshod290804@cluster0.cx9ug.mongodb.net/node-blog";

mongoose.connect(databaseUrl);

app.use(
  expressSession({
    secret: "mirshod_sherzodovich",
    store: mongoStore.create({ mongoUrl: databaseUrl }),
  })
);

app.use(fileUpload());
app.use(express.static("public"));
app.use(expressEdge.engine);
app.set("views", `${__dirname}/views`);
app.use(express.json());
app.use(express.urlencoded());
app.use(connectFlash());
app.use("*", (req, res, next) => {
  app.locals.auth = req.session.userId;
  next();
});

app.get("/", homePageController);

app.get("/about", aboutController);

app.get("/contact", contactController);

app.get("/post/:id", getPostController);

app.get("/posts/new", authMiddleware, postsNewsController);

app.post("/posts/create", validateCreatePostMiddleware, postsCreateController);

app.get("/reg", redirectIfAuth, createUserController);
app.post("/auth/reg", storeUserController);

app.get("/login", redirectIfAuth, loginController);
app.post("/auth/log", loginStoreController);

app.get("/logout", authMiddleware, logoutController);

app.use((req, res) => res.render("notFound"));

app.listen(5001, () => {
  console.log("Project ha started on port 5000...");
});
