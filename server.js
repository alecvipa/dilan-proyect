if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load()
}

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;
const payPalId = process.env.payPalId;
const email = process.env.email;
const superSecretPwd = process.env.superSecretPwd;

const express = require('express');
const app = express();
const fs = require('fs');
const stripe = require('stripe')(stripeSecretKey);
const nodemailer = require("nodemailer");
var PORT = process.env.PORT || 3000;
const targetBaseUrl = 'https://www.thewowbox.mx/inicio';

// function handleRedirect(req,res){
//   const targetUrl = targetBaseUrl + req.originalUrl;
//   return 
// };

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.static('public'))

// app.get('/', handleRedirect);



app.get('/', function (req, res) {
  fs.readFile('items.json', function (error, data) {
    if (error) {
      res.status(500).end()
    } else {
      res.render('store.ejs', {
        stripePublicKey: stripePublicKey,
        items: JSON.parse(data)
      });
    }
  })
});

// app.get('/', function (req, res) {
//   fs.readFile('items.json', function (error, data) {
//     if (error) {
//       res.status(500).end()
//     } else {
//       res.redirect(targetBaseUrl);
//       // res.render('construction.ejs', {
//       //   stripePublicKey: stripePublicKey,
//       //   items: JSON.parse(data)
//       // });
//     }
//   })
// });

app.get('/sucess', function (req, res) {
  fs.readFile('items.json', function (error, data) {
    if (error) {
      res.status(500).end()
    } else {
      res.render('sucess.ejs', {
        payPalId: payPalId,
        items: JSON.parse(data)
      });
    }
  });
});

app.get('/privacy', function (req, res) {
  fs.readFile('items.json', function (error, data) {
    if (error) {
      res.status(500).end()
    } else {
      res.render('privacy.ejs');
    }
  });
});

app.get('/contacto', function (req, res) {
  fs.readFile('items.json', function (error, data) {
    if (error) {
      res.status(500).end()
    } else {
      res.render('contact.ejs');
    }
  });
});

app.get('/faq', function (req, res) {
  fs.readFile('items.json', function (error, data) {
    if (error) {
      res.status(500).end()
    } else {
      res.render('faq.ejs');
    }
  });
});
app.get('/terminos', function (req, res) {
  fs.readFile('items.json', function (error, data) {
    if (error) {
      res.status(500).end()
    } else {
      res.render('terminos.ejs');
    }
  });
});

app.post('/purchase', function (req, res) {
  fs.readFile('items.json', function (error, data) {
    if (error) {
      res.status(500).end();
    } else {
      console.log('purchase')
      const itemsJson = JSON.parse(data);
      const itemsArray = itemsJson.experiencias.concat(itemsJson.experienciaPremium);
      let total = 0;
      var body = req.body;
      console.log(body);

      req.body.items.forEach(function (item) {
        const itemJson = itemsArray.find(function (i) {
          return i.id == item.id;
        });
        total = total + itemJson.price * item.quantity;
      });

      stripe.charges.create({
        amount: total,
        source: req.body.stripeTokenId,
        currency: 'mxn'
      }).then(function () {
        console.log('Cargo exitoso')
        res.json({ message: 'Artículos comprados exitosamente' });
      }).catch(function () {
        console.log('Cobro fallido')
        res.status(500).end()
      });
    };
  });
});

app.get("/api/:zips?", function (req, res) {
  var zipCodes = [
    {
      name: "Códigos Postales Disponibles",
      disponibles: ["55140", "SuperPromo1", "52938"],
    },
  ];

  var chosen = req.params.zips;
  console.log(chosen);
  console.log(zipCodes[0].disponibles[0]);

  if (chosen) {

    for (var i = 0; i < zipCodes.length; i++) {
      if (chosen === zipCodes[0].disponibles[0] || chosen === zipCodes[0].disponibles[1] || chosen === zipCodes[0].disponibles[2]) {
        return res.json(zipCodes[i]);
      }
    }

    return res.send("Código postal sin cobertura");
  }
  else {
    res.json(otherModels);
  }

});


app.post("/ajax/email", function (request, response) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    port: 25,
    auth: {
      user: email,
      pass: superSecretPwd
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  console.log(request.body);

  var textBody = `FROM: ${request.body.name}; EMAIL: ${request.body.email}; NUMBER: ${request.body.number}; MESSAGE: ${request.body.message}; DATE: ${request.body.date}; HOUR:${request.body.hour}; CHECKBOX:${request.body.checkbox}`;
  var htmlBody = `<h2>Solicitud de pedido</h2><p>Nombre: ${request.body.name}</p><p> Correo electrónico: <a href='mailto: ${request.body.email}'>${request.body.email}</a></p><p>Telefono de contacto: ${request.body.number}</p><p>Dirección de entrega: ${request.body.message}</p><p>Día de entrega: ${request.body.date}</p><p>Hora de entrega: ${request.body.hour}</p><p>Quieren novedades: ${request.body.checkbox}</p><p>Pedido: ${request.body.pedido}</p><p>Es para regalo: ${request.body.giftCheckbox}</p><p>Mensaje de regalo: ${request.body.giftMessage}</p>`;
  var mail = {
    from: '"Team: thewowbox.mx" <contacto@thewowbox.mx>',
    to: 'hebrit_626@hotmail.com',
    subject: '¡Alguien te ha hecho un pedido!',
    html: htmlBody
  };
  transporter.sendMail(mail, function (err, info) {
    if (err) {
      return console.log(err);
    } else {
      console.log("message sent!");
      console.log(request.body);
    };
  });
});

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function () {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});