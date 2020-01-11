import React from "react";
import Pagination from 'react-bootstrap/Pagination'

export default class Paginate extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;

        this.handleCurrentPageChange = this.handleCurrentPageChange.bind(this);
    }

    handleCurrentPageChange(event){
        let page = event.currentTarget.dataset.index;
        //console.log(key);
        if(page >= 0 && page < this.props.pagecount){
            this.props.handleTablePageChange(page);
        }
    }

    render(){
        let pagecount = this.props.pagecount ? this.props.pagecount * 1 : 0;
        let maxpages = this.props.maxpages ? this.props.maxpages * 1 : 10;
        let currentpage = this.props.currentpage * 1;

        let right =  currentpage + Math.ceil(maxpages / 2) - 1;
        let left = currentpage - Math.floor(maxpages / 2);

        //console.log(pagecount, " ", maxpages, " ", currentpage, " ", left, " ", right);

        if(right >= pagecount){
            left -= right - pagecount + 1;
            right = pagecount - 1;
        }

        if(left < 0){
            right -= left;
            left = 0;
            if(right >= pagecount){
                right = pagecount - 1;
            }
        }

        let visiblePageNumbers = [];
        for (let i = left; i <= right; i++){
            visiblePageNumbers.push(i);
        }

        let leftEllipsis = [];
        if(visiblePageNumbers && visiblePageNumbers[0] > 0){
            leftEllipsis.push(1);
        }

        let rightEllipsis = [];
        if(visiblePageNumbers && visiblePageNumbers[visiblePageNumbers.length - 1] < pagecount - 1){
            rightEllipsis.push(1);
        }
        
        return(
            <Pagination size="sm" style={{ justifyContent: "center"}}>
                <Pagination.First data-index={0} onClick={this.handleCurrentPageChange}/>
                <Pagination.Prev data-index={currentpage - 1} onClick={this.handleCurrentPageChange}/>
                {
                    leftEllipsis.map(()=>{
                        return <Pagination.Ellipsis key="leftellipsis" disabled />
                    })
                }                

                {
                    visiblePageNumbers.map((pageNum,i)=>{
                        return (
                            <Pagination.Item key={pageNum} data-index={pageNum} active={pageNum === currentpage} onClick={this.handleCurrentPageChange}>
                                {pageNum+1}
                            </Pagination.Item>
                        )
                    })
                }

                {
                    rightEllipsis.map(() => {
                        return <Pagination.Ellipsis key="rightellipsis" disabled />
                    })
                }

                <Pagination.Next data-index={currentpage + 1} onClick={this.handleCurrentPageChange}/>
                <Pagination.Last data-index={pagecount - 1} onClick={this.handleCurrentPageChange}/>
            </Pagination>
        )
    }
}