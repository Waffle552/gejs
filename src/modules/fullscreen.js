const $ = require('jquery')

class fullscreen {
    /**
     * Will put game into fullscreen mode and resize
     * @param {*} game
     * @param {Function} eventIn Will run whenever app goes into full screen mode.
     * @param {Function} eventOut Will run whenever app goes out of full screen mode.
     */
    constructor(game, eventIn, eventOut) {
        //fullscreen mode
        this.active = false
        let active = this.active
        $(game.renderer.domElement).click(function () {
            if (!active) {
                active = true
                document.body.requestFullscreen()
                document.body.requestPointerLock()
                game.renderer.setSize(window.innerWidth, window.innerHeight)
                game.mainCamera.aspect = window.innerWidth / window.innerHeight
                game.mainCamera.updateProjectionMatrix()
                
                if (eventIn) { eventIn() }
            }
        })
        $(document.body).bind('webkitfullscreenchange mozfullscreenchange fullscreenchange', function (e) {
            var state = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
            var event = state ? 'FullscreenOn' : 'FullscreenOff';
            if (event == "FullscreenOff") {
                active = false
                game.renderer.setSize(window.innerWidth, window.innerHeight)
                game.mainCamera.aspect = window.innerWidth / window.innerHeight
                game.mainCamera.updateProjectionMatrix()

                if (eventOut) { eventOut() }

            }
        });
    }
}

export default fullscreen