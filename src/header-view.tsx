import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

interface IHeaderProps {
    cartProduct?: number;  
}

export default class HeaderViewComponent extends React.Component<IHeaderProps, {}> {
    public props: IHeaderProps;
    constructor(props: IHeaderProps) {
        super(props);
        this.props = props;
    }

    public render(): JSX.Element | null {

        return (
            <div className="container">
            <div className="row align-items-center">
               <div className="col-lg-2 col-4">
                  <a href="/#" className="brand-wrap">
                  <img className="logo" alt="logo" src="../assets/images/logo/staricon.png" />
                  </a>
               </div>
                <div className="col-lg-6 col-sm-12">
                  <form action="#" className="search">
                     <div className="input-group w-100">                         
                        <div className="input-group-append">                         
                        </div>
                     </div>
                  </form>
               </div>  
               <div className="col-lg-4 col-sm-6 col-12">
                  <div className="widgets-wrap float-md-right">
                     <div className="widget-header  mr-3">
                        <NavLink to='/cart' className="nav-link icon icon-sm rounded-circle border"
                           activeClassName='active'>
                           <FontAwesomeIcon icon={faShoppingCart} className="fa fa-shopping-cart" />
                        </NavLink>
                        <span className="badge badge-pill badge-danger notify">{this.props.cartProduct}</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
        );
    }
}
