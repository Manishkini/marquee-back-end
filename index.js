const express = require('express');
const app = express();
const PORT = '9630';

const bodyParser = require('body-parser');

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('marquee_equity', 'postgres', 'manish', {
  dialect: 'postgres',
});

const Company = sequelize.define('company', {
  cin: {
    type: DataTypes.STRING,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
  },
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/addCompany', (req, res) => {
  Company.create({
    cin: req.body.cin,
    name: req.body.company,
  })
    .then(() => {
      res.status(200).send({
        data: { message: 'company added succsessfully!', responseCode: 100 },
      });
    })
    .catch(() => {
      res
        .status(200)
        .send({ data: { message: 'something went wrong', responseCode: 101 } });
    });
});

app.get('/getAllCompanies', async (req, res) => {
  const allCompnaies = await Company.findAll();
  res.status(200).send({
    data: {
      message: 'companies retrived succsessfully!',
      companies: allCompnaies,
      responseCode: 100,
    },
  });
});

sequelize.sync({ force: false }).then(async () => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/`);
  });
});
