const THREE = require('three')
const CANNON = require('cannon')
import { gameObject } from "./modules/gameObject.js"

var gameObjects

export function gameObjectsLoader(game) {
    gameObjects = {
        update: update,
        player: new gameObject(game, {
            mesh: { full: game.camera },
            position: new THREE.Vector3(0, 0, -6),
            shadows: 3,
            physics: {
                mass: 62,
                shape: new CANNON.Cylinder(.5, 2, .5, 32)
            }
        }),
        cube: new gameObject(game, {
            mesh: { geometry: new THREE.BoxBufferGeometry(2, 2, 2), material: new THREE.MeshPhongMaterial({ color: "#d12828" }) },
            position: new THREE.Vector3(0, 0, 0),
            shadows: 3,
            physics: {
                mass: 689,
                shape: new CANNON.Box(new CANNON.Vec3(1, 1, 1)),
                type: CANNON.Body.DYNAMIC
            }
        }),
        cube2: new gameObject(game, {
            mesh: { geometry: new THREE.BoxBufferGeometry(4, 4, 4), material: new THREE.MeshPhongMaterial({ color: "#d12828" }) },
            position: new THREE.Vector3(3, 0, 2),
            shadows: 3,
            physics: {
                mass: 689 * 4,
                shape: new CANNON.Box(new CANNON.Vec3(2, 2, 2)),
                type: CANNON.Body.DYNAMIC
            }
        }),
        ground: new gameObject(game, {
            mesh: { geometry: new THREE.BoxBufferGeometry(100, .02, 100), material: new THREE.MeshPhongMaterial({ color: "#ECB712" }) },
            position: new THREE.Vector3(0, -4, 0),
            shadows: 2,
            physics: {
                mass: 0,
                shape: new CANNON.Box(new CANNON.Vec3(50, .01, 50)),
                type: CANNON.Body.KINEMATIC,
            }
        }),
        roof: new gameObject(game, {
            mesh: { geometry: new THREE.BoxBufferGeometry(10, 2, 10), material: new THREE.MeshPhongMaterial({ color: 0x9842f5 }) },
            position: new THREE.Vector3(0, 2, 0),
            shadows: 3,
            physics: {
                mass: 0,
                shape: new CANNON.Box(new CANNON.Vec3(5, 1, 5)),
                type: CANNON.Body.KINEMATIC
            }
        })
    }

    gameObjects.player.lockRotation(true)


    game.gameObjects = gameObjects
    game.gameObjectRuntime = new updater([
        game.gameObjects.player.bodyToMeshUpdate({ mode: 0, posOffset: new THREE.Vector3(0, 1.8, 0) }),
        game.gameObjects.cube.bodyToMeshUpdate({}),
        game.gameObjects.cube2.bodyToMeshUpdate({}),
        game.gameObjects.ground.bodyToMeshUpdate({}),
        game.gameObjects.roof.bodyToMeshUpdate({})
    ])
}

class updater{
    constructor(updateFunctions = []) {
        this.updateFunctions = []
    }
    
    update() {

    }
    addArray(obj) {
        for(var i = 0; i < obj.length; i++) {

            this.updateFunctions.push(function() {obj[i]})
        }
    }
    add(obj) {

    }
}
function update(game) {

}