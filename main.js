import * as THREE from "three"
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import { gsap } from "gsap";
const scene=new THREE.Scene();

const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({
  color: "#00ff83",
  side: THREE.DoubleSide,
});
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);
const light = new THREE.PointLight(0xffffff,70,100);
light.position.set(0,10,10);
scene.add(light);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight);
camera.position.z = 15;
scene.add(camera);

const canvas = document.querySelector(".webgl");

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setPixelRatio(2)
renderer.render(scene, camera);


const controls=new OrbitControls(camera,canvas)
controls.enableDamping=true;
controls.enableZoom=false;
controls.enablePan=false;
controls.autoRotate=true;
controls.autoRotateSpeed=10;

window.addEventListener("resize",()=>{
renderer.setSize(window.innerWidth, window.innerHeight);
camera.aspect=window.innerWidth/window.innerHeight;
camera.updateProjectionMatrix()

})
function loop ()
{
  controls.update()
  renderer.render(scene,camera)
  window.requestAnimationFrame(loop)
}
loop();

// timeline

const t1=gsap.timeline({defaults:{duration:1}})
t1.fromTo(sphere.scale,{z:0,x:0,y:0},{z:1,x:1,y:1})
t1.fromTo("ul",{y:"-100%"},{y:"0%"})
t1.fromTo("h1",{opacity:"0"},{opacity:"1"})

window.addEventListener("mouseup",(e)=>{
  const height=Math.round((e.pageX/window.innerWidth)*255);
  const width=Math.round((e.pageY/window.innerHeight)*255);

    var rgb=[width,height,100]

    let newColor=new THREE.Color(`rgb(${rgb.join(",")})`)
    gsap.to(mesh.material.color,{r:newColor.r,g:newColor.g,b:newColor.b})
console.log(rgb)
  })