const express=require(express);
const app =express();
const PORT =8081;
app.use(express.json());
app.get("/", (req, res)=> {
res.status(200).json({
message: "Home Page :- )"
})
})
app.listen(PORT, ()=>{
console.log('Server is up and runing on http://localhost:${PORT}')
})