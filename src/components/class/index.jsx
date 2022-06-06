// import { projectScope } from 'npm'
import React, { Component, Fragment } from 'react'
import { Form } from 'react-bootstrap'
import { Table, Card, InputGroup, Alert } from 'react-bootstrap'
import { data } from '../data'


export class Index extends Component {
    render() {
        return (
            <div>
                <ProductTable />
            </div>
        )
    }
}

export default Index

class ProductTable extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: data,
            filteredData: data,
            searchText: "",
        }
    }
    

    filterData = () => {
        // const searchData = this.state.data?.filter((elem) => elem.title.toLowerCase().includes(this.state.searchText.toLowerCase()))
        const searchData = this.state.data?.filter((elem) => {
            
            if (elem.title.includes(this.state.searchText)) {
                console.log('for-title', elem.title)
               console.log(elem)
               return elem
            }
        })


        this.setState({
            filteredData: searchData
        })
        console.log("searchData", searchData)
        console.log(this.state.filteredData)
    }

    onInputChange = (e) => {
        this.setState({
            searchText: e.target.value
        })
        console.log(this.state.searchText);
        
    }
    buyGood = (idx) => {
        const newData = this.state.filteredData.map((item, index) => {
            if (index === idx) {
                item.numberOfTimes = item.numberOfTimes + +this.state[`num${idx}]`]
            }
            console.log(this.state[`num${idx}]`]);
            return item

        })
        this.setState({
            filteredData: newData
        })

    }
    
    

    
    render() {
        var datesFilter = new Set([]);
        data.forEach((elem) => {
            datesFilter.add(elem.date)
        })
        return (
            <div>
                <Card>
                    <Search searchText={this.state.searchText} filterData={this.filterData} onInputChange={this.onInputChange} />

                    <Table bordered striped>
                        <TableBody date={Array.from(datesFilter)} data={this.state.filteredData} buyGood={this.buyGood} />
                    </Table>
                </Card>
            </div>
        )
    }
}

class Search extends Component {
    render(props) {
        return (
            <Card.Header>
                <InputGroup>
                    <Form.Control placeholder='search' value={this.props.searchText} onChange={(e) => this.props.onInputChange(e)} />
                    <InputGroup.Text onClick={this.props.filterData}>Search</InputGroup.Text>
                </InputGroup>
            </Card.Header>
        )
    }
}

class TableBody extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
        num: 0,
        filteredData:data
      }
    }
    buyGood = (idx) => {
        const newData = this.state.filteredData.map((item, index) => {
            if (index === idx) {
                item.numberOfTimes = item.numberOfTimes + +this.state[`num${idx}]`]
            }
            console.log(this.state[`num${idx}]`]);
            return item

        })
        this.setState({
            filteredData: newData
        })

    }
    
    

    render() {
        return (
            <>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>title</th>
                        <th>description</th>
                        <th>numberOfTimes</th>
                        <th>complete</th>
                        <th>canceled</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props?.date.map((elem, index) => (
                            <Fragment key={index}>
                                <tr><td>{elem}</td></tr>
                                {
                                    this.props.data?.map((item, idx) => (
                                        <Fragment key={idx}>
                                            {
                                                elem === item.date &&
                                                <tr>
                                                    <td>{item.id}</td>
                                                    <td>{item.title}</td>
                                                    <td>{item.description}</td>
                                                    <td>{item.numberOfTimes}</td>
                                                    <td>{item.complete ? 'true' : 'false'}</td>
                                                    <td>{item.canceled ? 'true' : 'false'}</td>
                                                    <td>
                                                        <InputGroup>
                                                            <Form.Control
                                                                placeholder='number of times'
                                                                type='number'
                                                                // defaultValue={this.state.num}
                                                                onChange={(event) => {
                                                                    console.log(`num ${idx}`, this.state[`num${idx}]`])
                                                                    this.setState({
                                                                        [`num${idx}]`]: event.target.value
                                                                    })

                                                                }
                                                                }
                                                            />
                                                            <InputGroup.Text onClick={() => this.buyGood(idx)}>Add Now</InputGroup.Text>
                                                        </InputGroup>
                                                        {
                                                            +this.state[`num${idx}]`] <= 0 &&
                                                            <Alert variant="danger">Invalid Number</Alert>
                                                        }

                                                    </td>
                                                </tr>
                                            }
                                        </Fragment>
                                    ))
                                }

                            </Fragment>
                        ))
                    }
                </tbody>
            </>
        )
    }
}









