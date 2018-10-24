import React from 'react';
import './header.less';
class PublicHeader extends React.Component {
    componentDidMount() {
    }

    render() {
        return (
            <div className="public-header flex items-center">
                <div className="left">
                    <i className="iconfont icon-fanhui"></i>
                </div>
                <div className="center box1">

                </div>
                <div className="right">

                </div>
            </div>
        )
    }
}

export default PublicHeader
