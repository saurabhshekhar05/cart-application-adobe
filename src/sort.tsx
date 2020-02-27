import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTh } from '@fortawesome/free-solid-svg-icons';

interface ISortingProps {
    totalItemCount?: number;
    sortByAndRefreshGrid: Function;
}
interface ISortingState {
    value: number;
}

export default class SortingComponent extends React.Component<ISortingProps, ISortingState> {
    constructor(props: ISortingProps) {
        super(props)
        this.state = {
            value: 0
        }
    }

    render() {
        return (
            <header className="border-bottom mb-4 pb-3">
                <div className="form-inline">
                    <span className="mr-md-auto">{this.props.totalItemCount} Items found </span>
                    <select className="mr-2 form-control" onChange={(event) => this.sortByOptions(event.target.value)}
                    >
                        <option value="PASC">Relevance</option>
                        <option value="PASC">Price: Low to High</option>
                        <option value="PDESC">Price: High to Low</option>
                        <option value="NASC">Name: A to Z</option>
                        <option value="NDESC">Name: Z to A</option>
                    </select>
                    <div className="btn-group">
                        <a href="/#" className="btn  btn-outline-secondary active" data-toggle="tooltip" title=""
                            data-original-title="Grid view">
                            <FontAwesomeIcon icon={faTh} className="fa fa-th" />
                        </a>
                    </div>
                </div>
            </header>
        )
    }

    private sortByOptions(eventValue: string): void {
        this.props.sortByAndRefreshGrid(eventValue);
    }
}    
