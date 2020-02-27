import React from 'react'
import Slider from 'react-rangeslider';

interface SliderProps {
    value: number;
    maxPrice: number;
    minPrice?: number;
    onChangeSliderValue: Function;
}
interface ISliderState {
    value: number;
}

export default class HorizontalSliderComponent extends React.Component<SliderProps, ISliderState> {
    constructor(props: SliderProps) {
        super(props)
        this.state = {
            value: props.value
        }
        console.log('state.value ', this.state.value);
    }

    handleChangeStart = () => {
        console.log('Change event started')
    };

    handleChange = (value: number) => {
        this.setState({
            value: value
        })
    };

    handleChangeComplete = () => {
        console.log('Change event completed ', this.state.value);
        this.props.onChangeSliderValue(this.state.value);
    };

    render() {
        const { value } = this.state;
        return (
            <div className='slider custom-range'>
                <Slider
                    min={0}
                    max={this.props.maxPrice}
                    value={value}
                    onChangeStart={this.handleChangeStart}
                    onChange={this.handleChange}
                    onChangeComplete={this.handleChangeComplete}
                />
                <div className='value'>{value}</div>
            </div>
        )
    }
}    
