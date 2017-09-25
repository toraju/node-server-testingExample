const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {product} = require('./../models/Product');

// beforeEach(()=>{
//   Todo.remove({});
// });
beforeEach((done)=>{
  product.remove({}).then(()=> {
    Todo.remove({}).then(()=>done());
  });
});
describe('POST /product',()=>{
   it("Adding a product test",(done)=>{
     var item={
       name:'Display',
       price:30
     };
     request(app)
     .post('/product')
     .send(item)
     .expect(200)
     .expect((res)=>{
       console.log("res.body.name",res.body.name);
       console.log("item.name=",item.name)
       expect(res.body.name).toBe(item.name);
       expect(res.body.price).toBe(item.price);
     })
     //.end(done());
     .end((err,res)=>{
       if(err){
         console.log("How are you doing?"+ err);
         return done(err);}
       product.find().then((prods)=>{
         console.log(prods);
         console.log("Doing well");
         expect(prods.length).toBe(1);
         expect(prods[0].name).toBe(item.name);
         done();
       }).catch((e)=>done(e))
     });
   });
 });

describe('POST /todos',()=>{
  it('Should create a new todo',(done)=>{
     var text='lunch time todo test';
     request(app)
     .post('/todos')
     .send({text})
     .expect(200)
     .expect((res)=>{
       expect(res.body.text).toBe(text);
     })
     .end((err,res)=>{
       if(err){
         return done(err);
       }
       Todo.find().then((todos)=>{
         expect(todos.length).toBe(1);
         expect(todos[0].text).toBe(text);
         done();
       }).catch((e)=>done(e))
     });
  });
  it('Should not create entry in todo',(done)=>{
    request(app)
    .post('/todos')
    .send({text:""})
    .expect(400)
    .end(done());
  });
});
