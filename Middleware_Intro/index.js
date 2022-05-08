const express = require('express');
const morgan = require('morgan')
const AppError = require('./AppError')
const app = express();


app.use(morgan('common'))

app.use((req, res, next) => {
    req.requestTime = Date.now();
    console.log(req.method, req.path)
    next();
});

app.use('/dogs', (req, res, next) => {
    console.log("I love dogs")
    next()
});
const veryFiedPassword = ((req, res, next) => {
    const { password } = req.query;
    if (password === 'chickennugget'){
        next()
    }
    
    throw new AppError('Password required!', 401);
})



app.get('/', (req, res) => {
    console.log(`REUEST DATE: ${req.requestTime}`)
    res.send('HOME PAGE')
});
app.get('/error', (req, res) => {
    chicken.fly()
})


app.get('/dogs', (req, res) => {
    console.log(`REUEST DATE: ${req.requestTime}`)
    res.send('WOOF WOOF!')
});
app.use('/secret',veryFiedPassword, (req, res, next) => {
    res.send('MY SECRETE IS: Sometimes i wear headphones in the publice so i dont talk to anyone')
})
app.get('/admin', (req, res) => {
    throw new AppError('You are not an Admin', 403)
})

app.use((req, res) => {
    res.status(404).send('Not found')
})
// app.use((err, req, res, next) => {
//     console.log("*******************************")
//     console.log("**********ERROR*************")
//     console.log("*******************************")
//     next(err)
//     // res.status(500).send('Something broke!')
// })

app.use((err, req, res, next) => {
  const { status= 500, message = 'something went wrong'} = err;
  res.status(status).send(message)
    
})

app.listen(3000, () => {
    console.log('App is running on localhost:3000')
})