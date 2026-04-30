import BaseComponent from '../BaseComponent/BaseComponent.jsx';
import './slider.css';


class Slider extends BaseComponent {
    constructor(props) {
        super();
        this._propsRules = [
            { name: 'slides', required: true, type: 'Array', minimum: 2 },
            { name: 'startSlide', type: 'number' },
            { name: 'direction', required: true, constStrings: ['vertical', 'horizontal'] },
            { name: 'auto', type: 'number', minimum: 1 }
        ];

        this.baseTransition = 'transform 0.3s ease-in-out';
        this.state = {
            currentSlide: props?.startSlide ? props?.startSlide - 1 : 0,
            slides_: props?.slides,
            sliderTransition: this.baseTransition,
            sliderTranslate: props?.startSlide ? (props.startSlide - 1) * -100 : 0,
            slidesQueue: this.buildSlidesQueue({ slidesLength: props?.slides?.length })
        };
    }
    setAuto(interval) {
        window.setInterval(() => {
            //this.buildSlidesQueue();
            console.log(123);
        }, 1000 * interval);
    }
    // componentDidMount() {
    //     this.setAuto(this.props.auto,);
    // }
    buildSlidesQueue(data) {
        const { nextSlideIndex, slidesLength, currentQueue } = data
        if (nextSlideIndex === undefined) {
            const queue = [];
            for (let i = 0; i < slidesLength; i++) {
                queue.push(i);
            }
            return queue;
        }

        const queue = [];
        for (let i of currentQueue.filter(el => el !== nextSlideIndex)) {
            queue.push(i);
        }

        return queue;
    }
    slideSlider(index) {
        const currentQueue = this.state.slidesQueue;

        if (index < 0) {
            index = 0;
            const nextSlideIndex = currentQueue.pop();
            const slidesQueue = [nextSlideIndex];
            for (let i of currentQueue.filter(el => el !== nextSlideIndex)) {
                slidesQueue.push(i);
            }
            this.setState({
                slidesQueue: slidesQueue,
                sliderTranslate: -100
            });
        } else if (index >= this.props.slides.length) {
            index = this.props.slides.length - 1;
            const nextSlideIndex = currentQueue[0];
            const slidesQueue = currentQueue.filter(el => el !== nextSlideIndex);
            slidesQueue.push(nextSlideIndex);
            this.setState({
                slidesQueue: slidesQueue,
                sliderTranslate: (index - 1) * -100
            });
        }

        this.setState({
            currentSlide: index,
            sliderTransition: 'none'
        });
        
        setTimeout(() => {
            this.setState({
                sliderTransition: this.baseTransition,
                sliderTranslate: (index < 0 ? index : -index)  * 100
            });
        }, 100);
    }
    renderComponent() {
        return (
            <div className="jsxrc-slider-container" style={{ height: `${this.props.height}px`, width: `${this.props.width}px` }}>
                <div className="jsxrc-slider">
                    <div style={{ flexDirection: this.props.direction === 'horizontal' ? 'row' : 'column', transition: this.state.sliderTransition, transform: `translate${this.props.direction === 'horizontal' ? 'X' : 'Y'}(${this.state.sliderTranslate}%)` }} className="jsxrc-slider-slides-container">
                        {
                            this.state?.slidesQueue.map(slideIdx => { return <div key={slideIdx} style={{ transform: this.state.currentSlide }} className="jsxrc-slider-slide">{this.props.slides[slideIdx].data}</div> })
                        }
                    </div>
                </div>
                <div className="jsxrc-slider-buttons-container">
                    <button onClick={() => { this.slideSlider(this.state.currentSlide - 1) }}>Назад</button>
                    <button onClick={() => { this.slideSlider(this.state.currentSlide + 1) }}>Вперед</button>
                </div>
            </div>
        );
    }
}

export default Slider;