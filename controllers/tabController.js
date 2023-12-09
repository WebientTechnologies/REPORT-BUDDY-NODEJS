const Tab = require('../models/tab');

exports.createTab = async(req, res) =>{
   try{
     const {name} = req.body;

        const tab = await Tab.findOne({name:name});
        if(tab){
            return res.status(400).json({ message: 'Tab Name already exists' });
        }
        const newTab = new Tab({
            name,
          });
      
          // Save the new customer to the database
          await newTab.save();
      
          return res.status(201).json({ message: 'Tab created successfully' });
    } catch (error) {
        console.error('Error during create Tab:', error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
}