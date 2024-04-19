import { DataTypes } from "sequelize";
import sequelize from "../db/init.js";

const Todo = sequelize.define("Todo",{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false
    },
    status:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:"pending"
    }
})

 export default Todo