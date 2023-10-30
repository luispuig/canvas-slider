# Canvas Slider

## How to See a Demo

The project can be tested at [https://canvas-slider-lpg.netlify.app/](https://canvas-slider-lpg.netlify.app/).

If you prefer to run it locally, you can clone the repository and run the following commands:

```bash
npm install
npm run preview
```

The build is already uploaded in the project's dist folder. If you want to build it again, you can run:

```bash
npm install
npm run build
```

**BROWSER SUPPORT**: The project was tested only on Chrome.

## Technologies used

For this project I used the following technologies:

- Vite
- React
- Typescript
- Tailwind
- XState
- PixiJS

**IMPORTANT NOTE**: Read the `decision process section` to understand the reason behind the technologies used, the decisions made and the alternatives considered.

## Possible improvements or iterations

- Add tests
- Improve the PixiJS implementation to reduce the bundle size
- Implement image lazy loading
- Use a lower level library or none library to manage the canvas. Read the `decision process section` for more options with its challenges and benefits.
- Create a guide for other developers to use the Slider component.

## Decision process

### Considerations and challenges

The need considered is creating a component to render items listed horizontally and scrolled it in a viewport with an specific size using a drag&drop movement.

The browser API improved a lot during the last years and we could give a chance to the scroll-snap CSS capabilities. Another option could be exploring the new CSS transitions API but it is still in development and only supported on Chrome.

Based on the provided document, using a canvas element is a fixed requirement on this use-case. Based on this let’s divide the problem in 2 parts:

- Handling the Drag&Drop and translate it to a “scroll-position”
- Rendering the images based on desired “scroll-position”.

### Handling the Drag&Drop

Component could be in 2 internal states: idle or dragging. During the dragging state, we need to do some calculations to get the delta from the initial dragging point to the current point. The calculations will end with the “scroll-position” that will be passed to the next part of the process: rendering the images based on the “scroll-position”. It is not mandatory but if we can use a “scroll-position” compatible with the potential implementation of an HTML scroll implementation, it could help on further implementations, but this is not a requirement, let’s apply it only if it comes natural.

We need an internal component state to handle the states (idle, dragging), intermediate state (start dragging position) and the result (scroll-position). This can be implemented using the framework internals, useState in redux. In a real scenario, we could have guidelines or an internal meeting for this decision but I will assume it happened, a proposed using xstate and it was bought: - It is a state management library that works with Finite Machines - It has a very visual way to show the logic - It is fully testable - It is framework agnostic - It simply the implementation

The main challenge is on the performance side. If we re-remder the component on every mouse move event we can fall into chunky experience.

### Rendering the images based on the “scroll-position”

This part of the UI would react to a “scroll-position” value. Working with canvas api could be difficult to maintain as the need grows but using a library has it cons too. We will need to make a decision, assuming that we need to support React framework at this point.

#### OPTION 1: Vanilla javascript.

Using Vanilla javascript, we can avoid having dependencies that we do not use. The canvas API is very stable but on the mayor browser updates some bugs can show, ir happen on Safari iOS couple of versions ago breaking many Games development.

The main challenges will be:

- Deal with browser compatibilities
- Deal with the request of the images to render them into the canvas
- Deal with the position and scaling of the images
- Deal with the performance of the canvas rendering on "scrolling"
- Deal with the imperative Canvas API to offer a declarative interface to react to the "scroll-position" value.

The main benefits will be:

- Full control of the code
- No dependencies
- Very small bundle size
- Full control of optimizations, like lazy loading of the images.

#### OPTION 2: React-canvas

React canvas is a React layer to use canvas. It is created with performance in mind. It removes all the imperative interface of canvas, offering a declarative interface. It seems to be quite old. In case this would be in a real production scenario, I’d recommend researching more on the options.

It solves some of the challenges of the vanilla JavaScript implementation:

- Deal with browser compatibilities
- Deal with the request of the images to render them into the canvas
- Deal with the imperative Canvas API to offer a declarative interface to react to the "scroll-position" value.

#### OPTION 3: PixiJS

PixiJS is a very popular library to create games and interactive experiences. It is very performant and it is used by many companies. It is a very mature library and it is very well maintained. It has a very active community and it is very well documented. It is a very good option to create a canvas based component.

It solves most of the challenges or at least helps with the image loading and positioning.

But, it doesn't come for free. The bundle size is usually big. It opens a lot of options but if the use case would be only creating this component, it could be an overkill.

However, since we have freedom to choose the technologies, I will use PixiJS to create the component as a PoC, understanding that it could not be the best option for some scenarios.
