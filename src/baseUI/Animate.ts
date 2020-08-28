import {css} from "styled-components";

const SlideShow = css`
  &.enter, &.appear {
    opacity: 0;
  }
  &.enter-active, &.appear-active{
    opacity: 1;
    transition: opacity 500ms ease-in;
  }
  &.enter-done{
    opacity: 1;
  }

  &.exit{
    opacity: 1;
  }

  &.exit-active{
    opacity: 0;
    transition: opacity 500ms ease-in;
  }

  &.exit-done{
    opacity: 0;
  }
`;

const SlideRight = css`
  &.enter, &.appear {
    opacity: 0;
    transform: translateX(500px);
  }
  &.enter-active, &.appear-active{
    opacity: 1;
    transform: translateX(0);
    transition: 500ms ease-in;
  }
  &.enter-done{
    transform: translateX(0);
    opacity: 1;
  }

  &.exit{
    opacity: 1;
    transform: translateX(0);
  }

  &.exit-active{
    opacity: 0;
    transform: translateX(500px);
    transition: 500ms ease-in;
  }

  &.exit-done{
    opacity: 0;
    transform: translateX(500px);
  }
`;

const SlideRotateY = css`
  &.enter, &.appear {
    opacity: 0;
    transform: translate(-50%, -200%) rotateY(720deg);
  }
  &.enter-active, &.appear-active{
    opacity: 1;
    transform: translate(-50%, -50%) rotateY(0deg);
    transition: 1s ease-in;
  }
  &.enter-done{
    transform: translate(-50%, -50%) rotateY(0deg);
    opacity: 1;
  }

  &.exit{
    opacity: 1;
    transform: translate(-50%, -50%) rotateY(0deg);
  }

  &.exit-active{
    opacity: 0;
    transform: translate(-50%, -200%) rotateY(720deg);
    transition: 1s ease-in;
  }

  &.exit-done{
    opacity: 0;
    transform: translate(-50%, -200%) rotateY(720deg);
  }
`;

const SlideDown = css`
  &.enter, &.appear {
    opacity: 0;
    transform: translate(-50%, -200%);
  }
  &.enter-active, &.appear-active{
    opacity: 1;
    transform: translate(-50%, -50%);
    transition: 1s ease-in;
  }
  &.enter-done{
    transform: translate(-50%, -50%);
    opacity: 1;
  }

  &.exit{
    opacity: 1;
    transform: translate(-50%, -50%);
  }

  &.exit-active{
    opacity: 0;
    transform: translate(-50%, -200%);
    transition: 1s ease-in;
  }

  &.exit-done{
    opacity: 0;
    transform: translate(-50%, -200%);
  }
`;

export {
    SlideShow,
    SlideRight,
    SlideRotateY,
    SlideDown
};