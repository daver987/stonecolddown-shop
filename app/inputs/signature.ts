import { createInput } from '@formkit/vue'
import type { FormKitNode } from '@formkit/core'

function useSignature(node: FormKitNode) {
  let canvasRef: HTMLCanvasElement | null = null
  let ctx: CanvasRenderingContext2D | null = null
  let isDrawing = false

  node.on('created', () => {
    if (node.context) {
      node.context.handlers = {
        ...node.context.handlers,
        startDrawing: (event: MouseEvent) => {
          isDrawing = true
          const rect = (
            event.target as HTMLCanvasElement
          ).getBoundingClientRect()
          ctx?.beginPath()
          ctx?.moveTo(event.clientX - rect.left, event.clientY - rect.top)
        },
        draw: (event: MouseEvent) => {
          if (!isDrawing) return
          const rect = (
            event.target as HTMLCanvasElement
          ).getBoundingClientRect()
          ctx?.lineTo(event.clientX - rect.left, event.clientY - rect.top)
          ctx?.stroke()
        },
        stopDrawing: () => {
          isDrawing = false
          node.input(canvasRef?.toDataURL())
        },
        clearCanvas: (event: Event) => {
          event.preventDefault()
          if (!(ctx && canvasRef)) {
            return
          }
          ctx.clearRect(0, 0, canvasRef.width, canvasRef.height)
          node.input(null)
          node.emit('clear')
        },
      }
    }
  })

  node.on('mounted', () => {
    canvasRef = document.querySelector(`#${node.props.id}`) as HTMLCanvasElement
    ctx = canvasRef?.getContext('2d')
    if (ctx) {
      ctx.strokeStyle = node.props.lineColor
      ctx.lineWidth = node.props.lineWidth
    }
  })
}

const signatureSchema = [
  {
    $el: 'div',
    attrs: {
      class: '$classes.outer',
    },
    children: [
      {
        $el: 'canvas',
        attrs: {
          id: '$id',
          class: {
            '$classes.canvas': true,
            'border border-zinc-600 rounded-md cursor-crosshair': true,
          },
          width: '$width',
          height: '$height',
          onMousedown: '$handlers.startDrawing',
          onMousemove: '$handlers.draw',
          onMouseup: '$handlers.stopDrawing',
          onMouseleave: '$handlers.stopDrawing',
        },
      },
      {
        $el: 'button',
        attrs: {
          type: 'button',
          class: {
            '$classes.clearButton': true,
            'mt-2 text-white hover:text-zinc-400 text-sm mr-4': true,
          },
          onClick: '$handlers.clearCanvas',
        },
        children: 'Clear',
      },
    ],
  },
]

export const signature = createInput(signatureSchema, {
  props: ['width', 'height', 'lineColor', 'lineWidth'],
  features: [useSignature],
})
