import React, { Component } from 'react';
import Loader from 'react-loader'
import { BsSearch } from 'react-icons/bs'
import './index.css'

const API_KEY = 'AIzaSyAENe2jAH8_iLI5Bdc5uzCwjT4vOVzPtho';
//AIzaSyBOxLpGsh8FHmDVg7qYpzQC5VOFI6UTGvY
//

class KeyWord extends Component {
    state = { keyword: '', youtubeSearchVolume: 0, isLoading: false }


    handleKeywordChange = (event) => {
        this.setState({ keyword: event.target.value });
    };

    handleSearch = async () => {
        try {
            const { keyword } = this.state
            this.setState({ isLoading: true });
            const youtubeResponse = await fetch(
                `https://www.googleapis.com/youtube/v3/search?q=${encodeURIComponent(keyword)}&key=${API_KEY}`
            );
            const youtubeData = await youtubeResponse.json();

            const youtubeCount = youtubeData.pageInfo.totalResults;

            //setYoutubeSearchVolume(youtubeCount);
            this.setState({
                isLoading: false,
                youtubeSearchVolume: youtubeCount
            })
        }
        catch (e) {
            this.setState({
                isLoading: false,

            })
            console.log(e);

        }
    };
    render() {
        const { keyword, isLoading, youtubeSearchVolume } = this.state
        return (
            <div className='main-container'>

                <div className='app-container'>
                    
                    <div className='data-container2'>
                    <h1 className='head'><span className='head1'>Enter keyword to</span> search the volume</h1>
                        <div className='search-container'>
                            <input
                                type="text"
                                value={keyword}
                                onChange={this.handleKeywordChange}
                                placeholder="Enter keyword"
                                className='input'
                            />
                            <button onClick={this.handleSearch} className='search'><BsSearch /></button>
                        </div>
                        <p className=''>Entered <span className='keyword'>{keyword}</span> Keyword Search Volume</p>
                        <div>
                            {isLoading ?
                                <div className="loader-container" data-testid="loader">
                                    <Loader type="ThreeDots" color="#4f46e5" height="5" width="2" />
                                </div> : <span className='count'>{youtubeSearchVolume}</span>}

                        </div>
                    </div>
                </div>


            </div>
        );
    }
};

export default KeyWord;


