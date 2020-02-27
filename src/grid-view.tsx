import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag, faChevronDown } from '@fortawesome/free-solid-svg-icons';

import HorizontalSliderComponent from './slider';
import SortingComponent from './sort';

interface IProductClass {
    id: number;
    name: string;
    price: number;
    discount: number;
    category: string;
    img_url: string;
}

interface ICartProps {
    isActive?: boolean;
    cartProduct?: number;
    updateCartitem: Function;
    sortByAndRefreshGrid: Function;
    productList: IProductClass[];
    maxPriceRange: number;
    minPriceRange: number;
    onChangeSliderValue: Function;
    totalItemCount?: number;
}

export default class GridDetailsComponent extends React.Component<ICartProps, {}> {
    public props: ICartProps;
    constructor(props: ICartProps) {
        super(props);
        this.props = props;
        this.sortByOptions = this.sortByOptions.bind(this);
    }
    private handleChangeComplete = (value: number) => {
        console.log('Change event completed');
        this.props.onChangeSliderValue(value);
    };
    render(): JSX.Element | null {
        return (
            <React.Fragment>
                <section className="section-pagetop bg">
                    <div className="container">
                        <h2 className="title-page">Category products</h2>
                    </div>
                </section>
                <section className="section-content padding-y">
                    <div className="container">
                        <div className="row">
                            <aside className="col-md-3">
                                <div className="card">
                                    <article className="filter-group">
                                        <header className="card-header">
                                            <a href="/#" data-toggle="collapse" data-target="#collapse_3" aria-expanded="true" className="">
                                                <FontAwesomeIcon icon={faChevronDown} className="icon-control fa fa-chevron-down" />
                                                <h6 className="title">Price range </h6>
                                            </a>
                                        </header>
                                        <div className="filter-content collapse show" id="collapse_3" >
                                            <div className="card-body">
                                                <HorizontalSliderComponent value={this.props.maxPriceRange} minPrice={this.props.minPriceRange}
                                                    maxPrice={this.props.maxPriceRange} onChangeSliderValue={this.handleChangeComplete} />
                                            </div>
                                        </div>
                                    </article>
                                </div>
                            </aside>
                            <main className="col-md-9">
                                <SortingComponent totalItemCount={this.props.totalItemCount} sortByAndRefreshGrid={this.sortByOptions} />
                                <div className="row">
                                    {this.props.productList !== null && this.props.productList.map((items: IProductClass, index: number) => {
                                        return (
                                            <div className="col-md-4" key={index}>
                                                <figure className="card card-product-grid">
                                                    <div className="img-wrap">
                                                        <img src={items.img_url} alt={items.name} />
                                                    </div>
                                                    <figcaption className="info-wrap">
                                                        <div className="fix-height">
                                                            <a href="/#" className="title">{items.name}</a>
                                                            <div className="price-wrap mt-2">
                                                                <span className="price">{items.price}</span>
                                                                <del className="price-old">{items.discount}</del>
                                                            </div>
                                                        </div>
                                                        <a href="/#" id={'addToCartID_' + items.id} onClick={() => this.addToCart(this, items.id)}
                                                            className="btn btn-block btn-primary">
                                                            <FontAwesomeIcon icon={faShoppingBag} />
                                                            Add to cart </a>
                                                    </figcaption>
                                                </figure>
                                            </div>
                                        );
                                    })}
                                </div>
                            </main>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        );
    }

    private addToCart(e: any, productID: number): void {
        this.props.updateCartitem(productID);
    }

    private sortByOptions(eventValue: string): void {
        this.props.sortByAndRefreshGrid(eventValue);
    }

}
