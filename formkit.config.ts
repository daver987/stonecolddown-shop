import {
  createAutoHeightTextareaPlugin,
  createFloatingLabelsPlugin,
  createLocalStoragePlugin,
  createMultiStepPlugin,
} from '@formkit/addons'
import '@formkit/addons/css/floatingLabels'
import { genesisIcons, inputIcons, multiCurrency, star } from '@formkit/icons'
import { defineFormKitConfig } from '@formkit/vue'
import { signature } from './app/inputs'
import { rootClasses } from './formkit.theme'

export default defineFormKitConfig(() => {
  return {
    plugins: [
      createFloatingLabelsPlugin(),
      createAutoHeightTextareaPlugin(),
      createMultiStepPlugin(),
      createLocalStoragePlugin({
        prefix: 'fk-',
        key: 'user_form',
        control: undefined,
        maxAge: 3_600_000,
        debounce: 200,
        beforeSave: undefined,
        beforeLoad: undefined,
      }),
    ],
    icons: {
      ...genesisIcons,
      ...{
        input_autocomplete: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 18.47"><path fill="currentColor" d="M4.08,13.56a.82.82,0,0,1,.82.82V16a.82.82,0,0,1-.82.82H2.45A.82.82,0,0,1,1.63,16V14.38a.82.82,0,0,1,.82-.82H4.08m0-1.63H2.45A2.45,2.45,0,0,0,0,14.38V16a2.46,2.46,0,0,0,2.45,2.46H4.08A2.46,2.46,0,0,0,6.54,16V14.38a2.46,2.46,0,0,0-2.46-2.45ZM22.75,15.2a.82.82,0,0,0-.82-.82H9.68a.82.82,0,0,0,0,1.64H21.93A.82.82,0,0,0,22.75,15.2ZM20.22,6.61l1.44-1.45A.81.81,0,0,0,20.51,4L19.57,5,18.63,4a.81.81,0,0,0-1.15,0,.82.82,0,0,0,0,1.16l1.44,1.44a.84.84,0,0,0,.58.24h.14A.83.83,0,0,0,20.22,6.61ZM22.55,1.4A1,1,0,0,1,23.6,2.45V8.17a1,1,0,0,1-1.05,1.05H2.45A1,1,0,0,1,1.4,8.17V2.45A1,1,0,0,1,2.45,1.4h20.1m0-1.4H2.45A2.45,2.45,0,0,0,0,2.45V8.17a2.45,2.45,0,0,0,2.45,2.45h20.1A2.45,2.45,0,0,0,25,8.17V2.45A2.45,2.45,0,0,0,22.55,0ZM9.41,8.22V2.4a.13.13,0,0,0-.12-.12H9.18a.13.13,0,0,0-.12.12V8.22a.13.13,0,0,0,.12.12h.11A.13.13,0,0,0,9.41,8.22ZM7.88,2.8H4.07v.88h1.5V7.81h.88V3.68H7.88V2.8Z" /></svg>`,
        input_button: inputIcons.button,
        input_checkbox: inputIcons.checkbox,
        input_color: inputIcons.color,
        input_colorpicker: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12"><path fill="currentColor" d="m3.5,11.99H.5c-.28,0-.5-.22-.5-.5v-3c0-.13.05-.26.15-.35L5.15,3.15c.2-.2.51-.2.71,0l3,3c.2.2.2.51,0,.71l-5,5c-.09.09-.22.15-.35.15h0Zm-2.5-1h2.29l4.5-4.5-2.29-2.29L1,8.7v2.29ZM11.37,3.62l-1.38,1.38-3-3,1.38-1.38c.42-.42.96-.62,1.5-.62s1.08.2,1.5.62c.83.83.83,2.17,0,3Zm-.87,2.38c-.13,0-.26-.05-.35-.15l-4-4c-.2-.2-.2-.51,0-.71s.51-.2.71,0l4,4c.2.2.2.51,0,.71-.1.1-.23.15-.35.15h0Zm-.55,4.53h-1.44v-.56h1.44v-1.47h.61v1.47h1.44v.56h-1.44v1.47h-.61v-1.47Z" style="stroke-width: 0px;"/></svg>`,
        input_currency: multiCurrency,
        input_date: inputIcons.date,
        input_datepicker: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44"><path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M16.11 2.128a1.5 1.5 0 0 0-3 0v1.055H9.86A6.861 6.861 0 0 0 3 10.044v24.278a6.861 6.861 0 0 0 6.861 6.861H34.14A6.861 6.861 0 0 0 41 34.322V10.044a6.861 6.861 0 0 0-6.861-6.86h-3.252V2.127a1.5 1.5 0 0 0-3 0v1.055H16.11V2.128Zm-3 4.222v2.11a1.5 1.5 0 0 0 3 0V6.35h11.777v2.11a1.5 1.5 0 0 0 3 0V6.35h3.252a3.695 3.695 0 0 1 3.694 3.694v1.583H6.167v-1.583A3.694 3.694 0 0 1 9.86 6.35h3.249Zm-6.943 8.444h31.666v19.528a3.694 3.694 0 0 1-3.694 3.694H9.86a3.696 3.696 0 0 1-3.694-3.694V14.794Zm8.727 13.44a2.639 2.639 0 1 0-3.732 3.732 2.639 2.639 0 0 0 3.732-3.732Zm8.972 0a2.639 2.639 0 1 0-3.732 3.732 2.639 2.639 0 0 0 3.732-3.732Zm-8.972-8.445a2.639 2.639 0 1 0-3.732 3.732 2.639 2.639 0 0 0 3.732-3.732Zm8.972 0a2.639 2.639 0 1 0-3.732 3.732 2.639 2.639 0 0 0 3.732-3.732Zm8.972 0a2.639 2.639 0 1 0-3.732 3.732 2.639 2.639 0 0 0 3.732-3.732Z"/></svg>`,
        'input_datetime-local': inputIcons.datetime,
        input_dropdown: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25"><path fill="currentColor" d="M4.08 11.93a.82.82 0 0 1 .82.82v1.63a.82.82 0 0 1-.82.82H2.45a.82.82 0 0 1-.82-.82v-1.63a.82.82 0 0 1 .82-.82h1.63m0-1.63H2.45A2.45 2.45 0 0 0 0 12.75v1.63a2.45 2.45 0 0 0 2.45 2.45h1.63a2.46 2.46 0 0 0 2.46-2.45v-1.63a2.45 2.45 0 0 0-2.46-2.45Zm0 9.8a.82.82 0 0 1 .82.82v1.63a.82.82 0 0 1-.82.82H2.45a.82.82 0 0 1-.82-.82v-1.63a.82.82 0 0 1 .82-.82h1.63m0-1.63H2.45A2.45 2.45 0 0 0 0 20.92v1.63A2.45 2.45 0 0 0 2.45 25h1.63a2.46 2.46 0 0 0 2.46-2.45v-1.63a2.45 2.45 0 0 0-2.46-2.45Zm18.67-4.91a.82.82 0 0 0-.82-.81H9.68a.82.82 0 1 0 0 1.63h12.25a.82.82 0 0 0 .82-.82Zm-2.53-7.77 1.45-1.44a.84.84 0 0 0 0-1.16.82.82 0 0 0-1.16 0l-.94.94-.94-.94a.81.81 0 0 0-1.15 0 .82.82 0 0 0 0 1.16l1.44 1.44a.8.8 0 0 0 .58.21h.14a.78.78 0 0 0 .58-.21Zm2.53 15.94a.82.82 0 0 0-.82-.81H9.68a.82.82 0 0 0-.82.81.82.82 0 0 0 .82.82h12.25a.82.82 0 0 0 .82-.82Zm-.2-20.33a1 1 0 0 1 1.05 1.05v4.08a1 1 0 0 1-1.05 1H2.45a1 1 0 0 1-1.05-1V2.45A1 1 0 0 1 2.45 1.4h20.1m0-1.4H2.45A2.45 2.45 0 0 0 0 2.45v4.08A2.46 2.46 0 0 0 2.45 9h20.1A2.46 2.46 0 0 0 25 6.53V2.45A2.45 2.45 0 0 0 22.55 0Z"/></svg>`,
        input_email: inputIcons.email,
        input_file: inputIcons.file,
        input_group: inputIcons.group,
        input_hidden: inputIcons.hidden,
        input_list: inputIcons.list,
        input_mask: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 43.995 22.499"><path fill="currentColor" d="M28.362 22.499c-1.027-.425-2.001-1.016-2.928-1.636-.47-.315-.942-.6-1.409-.864h-4.002c-.467.264-.939.549-1.409.863-.927.621-1.901 1.212-2.928 1.637h12.676Z"/><path fill="currentColor" d="M38.519 0H5.477A5.477 5.477 0 0 0 0 5.477v11.546A5.477 5.477 0 0 0 5.477 22.5h4.666c-.972-.535-1.855-1.417-2.547-2.5H5.477A2.98 2.98 0 0 1 2.5 17.023V5.477A2.98 2.98 0 0 1 5.477 2.5h33.042a2.98 2.98 0 0 1 2.977 2.977v11.546A2.98 2.98 0 0 1 38.519 20h-2.066c-.692 1.083-1.575 1.965-2.547 2.5h4.612a5.477 5.477 0 0 0 5.477-5.477V5.477A5.477 5.477 0 0 0 38.518 0Z"/><path fill="currentColor" d="M31.506 10.745c-3.617 0-5.954 1.455-9.482 1.456-3.527 0-5.865-1.456-9.482-1.456-2.272 0-5.449 1.015-5.449 4.28s2.25 6.486 4.478 6.971c2.228.485 4.147-.397 6.486-1.963a22.841 22.841 0 0 1 1.84-1.113 4.48 4.48 0 0 1 4.254 0c.538.29 1.159.656 1.84 1.113 2.338 1.566 4.258 2.449 6.486 1.963 2.228-.485 4.478-3.706 4.478-6.971s-3.177-4.28-5.449-4.28ZM14.52 17.561c-2.103 0-3.618-1.779-3.618-1.779h-.029s1.529-1.779 3.633-1.779 3.618 1.779 3.618 1.779h.029s-1.529 1.779-3.633 1.779Zm18.626-1.779s-1.515 1.779-3.618 1.779-3.632-1.779-3.632-1.779h.029s1.515-1.779 3.618-1.779 3.633 1.779 3.633 1.779h-.029Z"/></svg>`,
        input_month: inputIcons.month,
        input_number: inputIcons.number,
        input_password: inputIcons.password,
        input_radio: inputIcons.radio,
        input_rating: star,
        input_range: inputIcons.range,
        input_repeater: inputIcons.repeater,
        input_select: inputIcons.select,
        input_slider: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 7"><path d="M14.5,4h-1c-.28,0-.5-.22-.5-.5s.22-.5,.5-.5h1c.28,0,.5,.22,.5,.5s-.22,.5-.5,.5Z" fill="currentColor"/><path d="M9.5,4h-3c-.28,0-.5-.22-.5-.5s.22-.5,.5-.5h3c.28,0,.5,.22,.5,.5s-.22,.5-.5,.5Z" fill="currentColor"/><path d="M2.5,4H1.5c-.28,0-.5-.22-.5-.5s.22-.5,.5-.5h1c.28,0,.5,.22,.5,.5s-.22,.5-.5,.5Z" fill="currentColor"/><path d="M4.5,5.5c-1.1,0-2-.9-2-2s.9-2,2-2,2,.9,2,2-.9,2-2,2Zm0-3c-.55,0-1,.45-1,1s.45,1,1,1,1-.45,1-1-.45-1-1-1Z" fill="currentColor"/><path d="M11.5,5.5c-1.1,0-2-.9-2-2s.9-2,2-2,2,.9,2,2-.9,2-2,2Zm0-3c-.55,0-1,.45-1,1s.45,1,1,1,1-.45,1-1-.45-1-1-1Z" fill="currentColor"/></svg>`,
        input_submit: inputIcons.submit,
        input_taglist: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25"><path fill="currentColor" d="M19.68 15.6a.83.83 0 0 1 .66.34L23 19.49 20.34 23a.85.85 0 0 1-.66.33H2.45a.82.82 0 0 1-.82-.82v-6.09a.82.82 0 0 1 .82-.82h17.23m0-1.63H2.45A2.45 2.45 0 0 0 0 16.42v6.13A2.45 2.45 0 0 0 2.45 25h17.23a2.45 2.45 0 0 0 2-1L25 19.49 21.65 15a2.45 2.45 0 0 0-2-1Zm0-12.34a.85.85 0 0 1 .66.33L23 5.51l-2.66 3.55a.83.83 0 0 1-.66.34H2.45a.82.82 0 0 1-.82-.82V2.45a.82.82 0 0 1 .82-.82h17.23m0-1.63H2.45A2.45 2.45 0 0 0 0 2.45v6.13A2.45 2.45 0 0 0 2.45 11h17.23a2.45 2.45 0 0 0 2-1L25 5.51 21.65 1a2.45 2.45 0 0 0-2-1Zm-3.26 17.44a2 2 0 1 0 2 2 2 2 0 0 0-2-2Zm0-14a2 2 0 1 0 2 2 2 2 0 0 0-2-1.97Z"/></svg>`,
        input_tel: inputIcons.telephone,
        input_text: inputIcons.text,
        input_textarea: inputIcons.textarea,
        input_time: inputIcons.time,
        input_toggle: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 17.65"><path fill="currentColor" d="M16.18 1.63a7.19 7.19 0 0 1 0 14.38H8.82a7.19 7.19 0 0 1 0-14.38h7.36m0-1.63H8.82A8.82 8.82 0 0 0 0 8.82a8.82 8.82 0 0 0 8.82 8.83h7.36A8.82 8.82 0 0 0 25 8.82 8.82 8.82 0 0 0 16.18 0ZM8.37 13.93a5.11 5.11 0 1 0-5.1-5.11 5.11 5.11 0 0 0 5.1 5.11Z"/></svg>`,
        input_togglebuttons: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80.1 35.1"><path fill="currentColor" d="M34.6,19h11c0.8,0,1.5-0.7,1.5-1.5S46.4,16,45.6,16h-11c-0.8,0-1.5,0.7-1.5,1.5S33.8,19,34.6,19z"/><path fill="currentColor" d="M77.4,0H2.7C1.2,0,0,1.2,0,2.7v29.6C0,33.8,1.2,35,2.7,35h74.6l0.1,0.1c1.5,0,2.7-1.2,2.7-2.7V2.7C80.1,1.2,78.9,0,77.4,0z M19.9,19h-11c-0.8,0-1.5-0.7-1.5-1.5S8.1,16,8.9,16h11c0.8,0,1.5,0.7,1.5,1.5S20.7,19,19.9,19z M51.5,32H28.7V3h22.8V32z M77,30 c0,1.1-0.9,2-2,2H54.5V3H75c1.1,0,2,0.9,2,2V30z"/><path fill="currentColor" d="M71.3,16h-11c-0.8,0-1.5,0.7-1.5,1.5s0.7,1.5,1.5,1.5h11c0.8,0,1.5-0.7,1.5-1.5S72.1,16,71.3,16z"/></svg>`,
        input_url: inputIcons.url,
      },
    },
    inputs: {
      signature,
    },
    config: {
      rootClasses,
    },
  }
})
