const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authroutes');



const app = express();
const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());


const sequelize = new Sequelize('task_management', 'root', 'SQLpassword', {
  host: 'localhost',
  dialect: 'mysql',
});


const User = sequelize.define('user', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
});

module.exports={User}

const Project = sequelize.define('Project', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
});
module.exports={Project}

const Task = sequelize.define('Task', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  projectName: {
    type: DataTypes.STRING,
    allowNull: false,
  
  },
  
  deadline: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  Status: {
    type: DataTypes.STRING,
    defaultValue: 'on progress',
  },
});


Project.hasMany(Task, { onDelete: 'cascade' });
Task.belongsTo(Project);

const PORT = process.env.PORT || 3001;

app.use('/user',authRoutes);
app.use('/projects', projectRoutes);
app.use('/tasks', taskRoutes);



sequelize.sync({ force: false })
  .then(() => {
    console.log('Database synced successfully');
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  });

  sequelize.sync({ force: false, models: [User] })
  .then(() => {
    console.log('Database synced successfully');
    
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  });
