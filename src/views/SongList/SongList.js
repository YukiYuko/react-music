import React from 'react'
import Sing from '../../components/public/sing/Sing'
import PublicHeader from '../../components/public/header/Header'
import {playlistDetail} from '../../request/api';

class SongList extends React.Component {
    componentDidMount() {
        this.getDetail()
    }
    getDetail() {
        let params = {
            id: ''
        }
    }
    render() {
        return (
            <div className="songList">
                <PublicHeader></PublicHeader>
            </div>
        )
    }
}

export default SongList
