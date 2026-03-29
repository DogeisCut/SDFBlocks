# TODO

## Notes:
Not gonna bother with custom block shapes, just gonna do what the Pen+ shader editor does and use colors and shadowed inputs.
Also wont have to worry about strings, since those arent in shaders. Gonna follow Scratch design closer than I did with fluffblocks.
There might be an extension for strings if I ever add like... letter sdfs or something. But that sounds hard.

Still using loops for hats though 

## Raymarcher:
- [ ] Raymarcher

## Categories:
- [ ] Scene
    - Hidden Category, only contains one block.
    - [ ] scene [SDF]
        - Function: Spawns with every project, it can't be removed, moved, etc. Contains the scene
        - Inputs:
            - SDF:
                - Type: Input (SDF)
                - Shadow: nothing

- [ ] Color

- [ ] Surfaces
    - [ ] generic surface
        - Function: white with 1 roughness and 0 everything else.
        - Output: Surface
    - [ ] create surface colored [COLOR] at [ROUGHNESS] roughness [METALLICITY] metallicity and [EMISSION] emission
        - Function: Creates an surface with specified properties.
        - Output: Surface
        - Inputs:
            - COLOR:
                - Type: Input (Color)
                - Shadow: values_color
                - Default: #ffffff
            - ROUGHNESS:
                - Type: Input (Number)
                - Shadow: values_unit_float
                - Default: 1.0
            - METALLICITY:
                - Type: Input (Number)
                - Shadow: values_unit_float
                - Default: 0.0
            - EMISSION:
                - Type: Input (Number)
                - Shadow: values_unit_float
                - Default: 0.0

- [ ] SDFs
    - [ ] nothing
        - Function: mostly for shadows tbh.
        - Output: SDF
    - [ ] sphere with surface [SURFACE] at [TRANSFORM] with a radius of [RADIUS]
        - Function: Creates an SDF sphere at the specified position.
        - Output: SDF
        - Inputs:
            - SURFACE:
                - Type: Input (Surface)
                - Shadow: surfaces_generic_surface
            - TRANSFORM:
                - Type: Statement (TRANSFORM)
            - RADIUS:
                - Type: Input (Number)
                - Shadow: values_float
                - Default: 1.0

- [ ] SDF Operations
    - [ ] smooth union [A] with [B] at [SMOOTHNESS] smoothness
        - Function: Smoothly unions two SDFs at a specified smoothness level.
        - Output: SDF
        - Inputs:
            - A:
                - Type: Input (SDF)
                - Shadow: sdfs_nothing
            - B:
                - Type: Input (SDF)
                - Shadow: sdfs_nothing
            - SMOOTHNESS:
                - Type: Input (Number)
                - Shadow: values_float
                - Default: 0.5

- [ ] Transform Operations
    - [ ] translate by [POSITION]
        - Function: Translates the target SDF
        - Top Notch: Transform
        - Bottom Notch: Transform
        - Inputs:
            - POSITION:
                - Type: Input (Vector3)
                - Shadow: values_vector3
                - Default: 0,0,0

- [ ] Control

- [ ] Operators

- [ ] Sensing
    - Only really contains stuff like screen size, and timer.

- [ ] Variables

- [ ] Functions