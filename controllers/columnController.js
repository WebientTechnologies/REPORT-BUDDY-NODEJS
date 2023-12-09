const Column = require('../models/column');

exports.createColumn = async(req, res) =>{
    try {
        const {name, tabId} = req.body;

        const column = await Column.findOne({name:name, tabId:tabId});

        if(column){
            return res.status(400).json({ message: 'Column Name already exists' });
        }
        const newColumn = new Column({
            name,
            tabId
          });
      
          // Save the new customer to the database
          await newColumn.save();
      
          return res.status(201).json({data:newColumn,  message: 'Column created successfully' });
    } catch (error) {
        console.error('Error during create Column:', error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
}