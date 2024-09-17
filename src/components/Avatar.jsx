import React, { useEffect, useRef } from 'react';
import { useAnimations, useFBX, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useControls } from "leva";
import * as THREE from 'three';

export function Avatar(props) {
  const { animation } = props;
  const { headFollow, cursorFollow, wireframe } = useControls({
    headFollow: false,
    cursorFollow: false,
    wireframe: false,
  });

  const group = useRef();
  const { nodes, materials } = useGLTF('models/avatar-Lawyer.glb');

  const { animations: talkingAnimation } = useFBX('animations/Talking.fbx');
  const { animations: idleAnimation } = useFBX('animations/Standing.fbx');
  const { animations: dance1 } = useFBX('animations/Dance-1.fbx');
  const { animations: dance2 } = useFBX('animations/Dance-2.fbx');
  const { animations: dance3 } = useFBX('animations/Dance-3.fbx');
  const { animations: dance4 } = useFBX('animations/Dance-4.fbx');
  const { animations: dance5 } = useFBX('animations/Dance-5.fbx');

  // Give names to these animations
  dance1[0].name = 'Dance1';
  dance2[0].name = 'Dance2';
  dance3[0].name = 'Dance3';
  dance4[0].name = 'Dance4';
  dance5[0].name = 'Dance5';

  talkingAnimation[0].name = 'Talking';
  idleAnimation[0].name = 'Standing';

  const { actions } = useAnimations(
    [talkingAnimation[0], idleAnimation[0], dance1[0], dance2[0], dance3[0], dance4[0], dance5[0]],
    group
  );

  useEffect(() => {
    if (actions[animation]) {
      actions[animation].reset().fadeIn(0).play();
    }
    return () => {
      if (actions[animation]) {
        actions[animation].reset().fadeOut(0);
      }
    };
  }, [animation, actions]);

  useFrame((state) => {
    if (headFollow) {
      group.current.getObjectByName("Head").lookAt(state.camera.position);
    }
    if (cursorFollow) {
      const target = new THREE.Vector3(state.mouse.x, state.mouse.y, 1);
      group.current.getObjectByName("Head").lookAt(target);
    }
  });

  useEffect(() => {
    Object.values(materials).forEach((material) => {
      material.wireframe = wireframe;
    });
  }, [wireframe, materials]);

  return (
    <group {...props} ref={group} dispose={null}>
      <group rotation={[10.65, 5.9 , .8]} position={[0, -1.5, 0]} scale={[1, 1, 1]}>
        <primitive object={nodes.Hips} />
        <skinnedMesh
          geometry={nodes.Wolf3D_Body.geometry}
          material={materials.Wolf3D_Body}
          skeleton={nodes.Wolf3D_Body.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
          material={materials.Wolf3D_Outfit_Bottom}
          skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
          material={materials.Wolf3D_Outfit_Footwear}
          skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Wolf3D_Outfit_Top.geometry}
          material={materials.Wolf3D_Outfit_Top}
          skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Wolf3D_Hair.geometry}
          material={materials.Wolf3D_Hair}
          skeleton={nodes.Wolf3D_Hair.skeleton}
        />
        <skinnedMesh
          name="EyeLeft"
          geometry={nodes.EyeLeft.geometry}
          material={materials.Wolf3D_Eye}
          skeleton={nodes.EyeLeft.skeleton}
          morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
          morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
        />
        <skinnedMesh
          name="EyeRight"
          geometry={nodes.EyeRight.geometry}
          material={materials.Wolf3D_Eye}
          skeleton={nodes.EyeRight.skeleton}
          morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
          morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
        />
        <skinnedMesh
          name="Wolf3D_Head"
          geometry={nodes.Wolf3D_Head.geometry}
          material={materials.Wolf3D_Skin}
          skeleton={nodes.Wolf3D_Head.skeleton}
          morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
          morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
        />
        <skinnedMesh
          name="Wolf3D_Teeth"
          geometry={nodes.Wolf3D_Teeth.geometry}
          material={materials.Wolf3D_Teeth}
          skeleton={nodes.Wolf3D_Teeth.skeleton}
          morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
          morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
        />
      </group>
    </group>
  );
}

useGLTF.preload('models/avatar-Lawyer.glb');
