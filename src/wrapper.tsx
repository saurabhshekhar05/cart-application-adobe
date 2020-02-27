import React from 'react';
import { apiService } from './services/api-service';
import GridDetailsComponent from './grid-view';

import './ui.scss';
import './responsivecart.scss';
import './all.min.scss';
import './wrapper.scss';

interface IWrapperProps {
    updateCartitem: Function; 
}

interface IWrapperState {
    cartitems: number;
    totalItemCount?: number;
    cartProducts: any;
    minPriceRange: number;
    maxPriceRange: number;
    isVisible?: boolean;
    isActive?: boolean;
    productList: IProductClass[];
    reservedProductList: IProductClass[];
    customClass?: string;
    loading?: boolean;
    error?: string;
}

interface IProductClass {
    id: number;
    name: string;
    price: number;
    discount: number;
    category: string;
    img_url: string;
}

export default class WrapperComponent extends React.Component<IWrapperProps, IWrapperState> {
    public props: IWrapperProps;
    public state: IWrapperState;

    constructor(props: IWrapperProps) {
        super(props);
        this.props = props;
        this.updateCartitem = this.updateCartitem.bind(this);
        this.sortByAndRefreshGrid = this.sortByAndRefreshGrid.bind(this);
        this.onChangeSliderValueFilter = this.onChangeSliderValueFilter.bind(this);
        this.state = {
            cartitems: 0, cartProducts: [], minPriceRange: 0, maxPriceRange: 0, customClass: '',
            isVisible: true, loading: true, error: '', productList: [], reservedProductList: []
        };
    }

    componentDidMount() {
        apiService.getCall('', '', null)
            .then(
                (product) => {
                    this.setState({
                        productList: product,
                        reservedProductList: product,
                        totalItemCount: product.length,
                        minPriceRange: product.reduce((min: number, p: any) => p.price < min ? p.price : min, product[0].price),
                        maxPriceRange: product.reduce((max: number, p: any) => p.price > max ? p.price : max, product[0].price),
                        loading: false,
                        customClass: '',
                        isVisible: true,
                        error: '',
                    });
                },
                (error) => {
                    this.setState({ error, loading: false });
                },
            );
    }

    private updateCartitem(productID: number) {
        console.log("clicked", productID);
        this.props.updateCartitem(productID);
    }

    private sortByAndRefreshGrid(eventValue: string) { 
        switch (eventValue) {  
            case "PASC":
                this.sortByPriceASC();
            break; 
            case "PDESC":
                this.sortByPriceDESC();
                break;
            case "NDESC":
                    this.sortByNameDESC();
                break;      
            case "NASC":
                    this.sortByNameASC();
                    break;  
            default:
                break;
        }
    }    
 
    private sortByNameASC() : void {
        this.setState((prevState: IWrapperState) => ({
            productList: prevState.productList.sort(function(a, b) {
                if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                return 0;
               })
        }));
    }
    private sortByNameDESC() : void {
        this.setState((prevState: IWrapperState) => ({
            productList: prevState.productList.sort(function(a, b) {
                if(a.name.toLowerCase() > b.name.toLowerCase()) return -1;
                if(a.name.toLowerCase() < b.name.toLowerCase()) return 1;
                return 0;
               })
        }));
    }
    private sortByPriceASC() : void {
        this.setState((prevState: IWrapperState) => ({
            productList: prevState.productList.sort((a, b) => (a.price - b.price))
        }));
    }

    private sortByPriceDESC() : void {
        this.setState((prevState: IWrapperState) => ({
            productList: prevState.productList.sort((a, b) => (b.price - a.price))
        }));
    }

    private onChangeSliderValueFilter(value: number) {
        this.state.productList = this.state.reservedProductList;
        this.setState((prevState: IWrapperState) => ({
            productList: prevState.productList.filter(x => x.price <= value)
        }));
    }

    render(): JSX.Element | null {
        return (
            <div className="wrapper">
                <GridDetailsComponent productList={this.state.productList} totalItemCount={this.state.totalItemCount}
                    updateCartitem={this.updateCartitem} minPriceRange={this.state.minPriceRange}
                    maxPriceRange={this.state.maxPriceRange} onChangeSliderValue={this.onChangeSliderValueFilter} 
                    sortByAndRefreshGrid={this.sortByAndRefreshGrid}
                    />
            </div>
        );
    }
}