import { test, describe } from 'node:test'
import assert from 'node:assert'
import listHelper from '../utils/list_helper'

import { BlogType } from '../types/blog'

test('dummy returns one', () => {
  const blogs:BlogType[] = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result,1)
})