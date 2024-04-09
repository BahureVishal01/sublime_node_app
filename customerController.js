const customerData= require('./customer.json')
const fs = require('fs');
let data = customerData;

async function getCustomers(req, res, next){
    try {
        let {firstName, lastName, city, page, limit=2} = req.query
        let filteredData = []
        
        if(firstName || lastName || city){
            data.forEach((ele)=>{
                if(ele.first_name == firstName){
                    filteredData.push(ele)
                }
                if(ele.last_name == lastName){
                    filteredData.push(ele)
                }
                if(ele.city == city){
                    filteredData.push(ele)
                }
            })
        }else{
            filteredData = data
        }
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const paginatedCustomers = filteredData.slice(startIndex, endIndex);
        
        return res.json({
            totalCustomers: filteredData.length,
            totalPages: Math.ceil(filteredData.length/limit),
            currentPage: page,
            data: paginatedCustomers
        })
    } catch (error) {
        return res.status(500).json({
            result:false,
            error: "Internal server error"
        })
    }
}

async function getCustomerById(req, res){
    try {
        let customerId = req.params.id 
        if(customerId){
          let customerData = data.find((ele)=> {
            return ele.id == customerId
          })
          if(customerData){
            return res.status(200).json({
                result : true,
                message : "Single Customer details",
                data : [customerData]
            })
          }
           return res.status(404).json({result:false, message : "Customer Not found"});
        }else{
            return res.json({
                result:false,
                message : "please provide customerId"
            })
        }
    } catch (error) {
       return res.status(500).json({
        result: false,
        error: "Internal server error"
       }) 
    }
}
async function getCityWithTotalCustomers(req, res){
    try {
        const customerFilePath = './customer.json';
        let rawData = fs.readFileSync(customerFilePath);
        let myData = JSON.parse(rawData);
       //    console.log(myData)
       let cityCounts = {}
        myData.forEach((ele)=>{
            let city = ele.city
             cityCounts[city] = (cityCounts[city] || 0) + 1;
        })
 
          return res.status(200).json({
            result : true,
            message : "Unique Cities with total customers ",
            data : cityCounts
          })
    } catch (error) {
        return res.status(500).json({result : false, error: "Internal server error"})
    }
}

async function addNewCustomer(req,res){
    try {
        const customerFilePath = './customer.json';
        let rawData = fs.readFileSync(customerFilePath);
        let myData = JSON.parse(rawData);
       //    console.log(myData)
        let data = myData
        let {first_name, last_name, city, company } = req.body;

        if (first_name && last_name && city && company) {
            // Generate unique ID for the new customer
          data.find((ele)=>{
                if(ele.city == city || ele.company ==company){
            const newCustomerId = data.length > 0 ? data[data.length - 1].id + 1 : 1;
            // Construct the new customer object
            const newCustomer = {
                id: newCustomerId,
                first_name,
                last_name,
                city,
                company
            };
            // Add the new customer to the existing data
            data.push(newCustomer);
            // Write the updated data back to the JSON file
            fs.writeFileSync(customerFilePath, JSON.stringify(data, null, 2));
            return res.status(201).json({ 
                 result: true,
                 message: "Customer added successfully",
                 data: newCustomer
                 });
        }else{
            return res.status(400).json({ result: false, message: "City or company is not exists, So you cannot add new city or company.." });      
        }
        })
        } else {
            return res.status(400).json({ result: false, message: "Invalid request body" });
        }
    } catch (error) {
        return res.status(500).json({
            result : false,
            error: "Internal server error"
        })
    }
}

module.exports = {getCustomers, getCustomerById, getCityWithTotalCustomers, addNewCustomer}