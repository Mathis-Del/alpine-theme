/**
 * Name: app
 * Description: app
 * Author: Epyo - stephen D.
 * Version: 1.0.0
 */
import { registerComponents, registerLayouts, loadScript } from './utils.js'
  


const components = [...document.querySelectorAll("[x-data$='()']")].map(component => {
  return component.getAttribute('x-data').slice(0,-2)
})

const layouts = [...document.querySelectorAll("[x-src]")].map(layer => layer.getAttribute('x-src'))


;(async () => {
  
  await import ('./vendors/spruce.js')
  await import ('./store.js')

  
  await registerLayouts(layouts)
  await registerComponents(components)
  
  loadScript('./static/js/vendors/materialize.min.js')
  .then( e => {
    // console.log('materialize loaded')
    // init
    M.AutoInit();
    
    // Element
    var elems = document.querySelectorAll('.sidenav-trigger');
    var instances = M.Sidenav.init(elems);
    // Floating button
    var elems = document.querySelectorAll('.fixed-action-btn');
    var instances = M.FloatingActionButton.init(elems, {
      direction: 'left'
    });
    // Date picker
    var elems = document.querySelectorAll('.datepicker');
    var instances = M.Datepicker.init(elems);
  })
  .catch( e => console.warn('error: materialize  unloaded') )

  // await import('./vendors/alpine-magic-helper.js')
  await import('./vendors/alpine.js')
  
})()

// Service worker: PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('./static/js/sw.js')
        .then(registration => console.log(`Service Worker load ! Ressource: ${registration.scope}`) )
        .catch(err => console.log(`Error loading Service Worker: ${err}`) )
  });
}
