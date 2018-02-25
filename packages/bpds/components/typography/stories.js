import React from 'react'
import { storiesOf } from '@storybook/react'
import { H1, H2, H3, H4, H5 } from './index'

storiesOf('Typography', module)
  .add('headers', () => (
    <div>
      <H1>h1: The quick brown fox jumps over the lazy dog</H1>
      <H2>h2: The quick brown fox jumps over the lazy dog</H2>
      <H3>h3: The quick brown fox jumps over the lazy dog</H3>
      <H4>h4: The quick brown fox jumps over the lazy dog</H4>
      <H5>h5: The quick brown fox jumps over the lazy dog</H5>
      <h6>h6: The quick brown fox jumps over the lazy dog</h6>

      <hr />
    </div>
  ))
  .add('paragraph', () => (
    <div>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni eveniet placeat consectetur velit accusamus incidunt, in amet corporis, vitae laborum omnis ratione autem quasi a earum itaque asperiores? Obcaecati, ipsa!</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni eveniet placeat consectetur velit accusamus incidunt, in amet corporis, vitae laborum omnis ratione autem quasi a earum itaque asperiores? Obcaecati, ipsa!</p>
      <p>Lorem ipsum dolor <strong>sit amet consectetur adipisicing</strong> elit. Magni eveniet placeat consectetur velit accusamus incidunt, in amet corporis, vitae laborum omnis ratione autem quasi a earum itaque asperiores? Obcaecati, ipsa!</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni eveniet placeat consectetur velit accusamus incidunt, in <a href='javascript:;'>amet corporis</a>, vitae laborum omnis ratione autem quasi a earum itaque asperiores? Obcaecati, ipsa!</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni eveniet placeat consectetur velit accusamus incidunt, in amet corporis, vitae laborum omnis ratione autem quasi a earum itaque asperiores? Obcaecati, ipsa!</p>
    </div>
  ))
