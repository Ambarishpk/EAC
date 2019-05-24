import React, { Component } from 'react'

export default class Expenses extends Component {
    constructor(props) {
        super(props);
         this.state = {
            budget:  JSON.parse(localStorage.getItem("budget")) || 1000,
            amount: JSON.parse(localStorage.getItem("balance")) || 1000,
            spend: JSON.parse(localStorage.getItem("spend")) || 0,
            expenses: JSON.parse(localStorage.getItem("expenses")) || [],
            expFor: '',
            cost: 0,
            msg: null,
            isAddExpenses: false
         }
        //  this.handleAddBudget = this.handleAddBudget.bind(this)
        //  this.handleAddExpenses = this.handleAddExpenses.bind(this)
        // this.handleChange = this.handleChange.bind(this) 
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    handleSubmit(e){
        e.preventDefault();
        if(!this.state.expFor.length){
            return;
        }
        if(!this.state.cost.length){
            return;
        }
        const forExp = this.state.expFor;
        const budg = Number(this.state.budget)
        const costExp = Number(this.state.cost);
        const amt = Number(this.state.amount);
        if(amt > 0){
            if(costExp < amt){
                const bal = amt - costExp;
                const spend = Number(this.state.spend);
                const youSpend = spend + costExp;
                this.setState({ cost: '', expFor: '', spend: youSpend, amount: bal })
                const myExp = this.state.expenses;
                myExp.push({ expFor: forExp, cost: costExp})
                this.setState({ expenses: myExp })
                localStorage.setItem("expenses", JSON.stringify(myExp))
                localStorage.setItem("budget", JSON.stringify(budg))
                localStorage.setItem("balance", JSON.stringify(bal))
                localStorage.setItem("spend", JSON.stringify(youSpend))
            }
            else{
                this.setState({msg: 'You Have Insufficient Balance'});
                setTimeout(
                    function() {
                        this.setState({msg: ''});
                    }
                    .bind(this),
                    3000
                );
            }
        }
        else{
            this.setState({ msg: 'Your Budget is Over'})
            setTimeout(
                function() {
                    this.setState({ msg: ''})
                }
                .bind(this),
                3000
            );
            
        }
    }

    
    handleAddBudget(){
       
    }

    handleAddExpenses(){
        localStorage.clear()
    }

 
    

    render() {
        return (
            <div>
             <center>

                {/* Add your Budget here */}
                <div className={`addBudget mt-3 ${this.isAddExpenses ? '' : 'd-none'}`}>
                    <strong>Add Budget : </strong><input type="number"/>&nbsp;&nbsp;
                    <button onSubmit={this.handleAddBudget} className="btn btn-primary">Add</button>
                </div>

                
                {/*Add your expenses here*/}

                <div className="container mt-5">
                    <div className={`alert alert-warning ${this.state.msg ? '' : 'd-none'}`}>
                        <strong>Warning!</strong>{this.state.msg}
                    </div>
                    <form className={`form1 ${this.isAddExpenses ? 'd-none' : ''}`} onSubmit={e => (this.handleSubmit(e))}>
                        <div className="h5-responsive text-danger">
                            <strong>My Expenses Caluclator (My Budget : {this.state.budget})</strong>
                        </div><br/>
                        <div>
                            <div className="list-items">    
                                {this.state.expenses.map((item,key)=>(
                                    <li key={key} className="text-primary">{item.expFor} : {item.cost}</li>
                                ))}
                            </div><br/>
                            <input value={this.state.cost} onChange={(e)=>this.setState({cost: e.target.value})} type="number" placeholder="Amount" /> &nbsp;
                            <input value={this.state.expFor} onChange={(e)=>this.setState({expFor: e.target.value})} type="text" placeholder="for what..?"/><br/><br/>
                            <button className="btn btn-primary">Add Item {this.state.expenses.length+1}</button>
                        </div><hr/>

                        {/* Display the Current Status */}

                        <div className="h5-responsive text-danger">
                            <strong>Status</strong>
                        </div><br/>
                        <div className="text-danger">
                            <strong>Current Amount : </strong><input type="text" value={ this.state.amount }   readOnly/> &nbsp;
                            <strong>You Spend : </strong><input type="text" value={ this.state.spend}  readOnly />
                        </div>
                    </form><br/>
                    
                </div>
                
                {/* Add New Expenses Here */}

                <div className={`newExp ${this.isAddExpenses ? 'd-none' : ''}`}>
                    <button  onClick={this.handleAddExpenses} onChange={e => this.setState({ isAddExpenses: false})} className="btn btn-primary">Add New Expenses</button>
                </div>
             </center>
            </div>
        )
    }
}
