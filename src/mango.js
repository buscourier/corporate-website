;(function (w, d, u, i, o, s, p) {
  if (d.getElementById(i)) {
    return
  }
  w['MangoObject'] = o
  w[o] =
    w[o] ||
    function () {
      ;(w[o].q = w[o].q || []).push(arguments)
    }
  w[o].u = u
  w[o].t = 1 * new Date()
  s = d.createElement('script')
  s.async = 1
  s.id = i
  s.src = u
  p = d.getElementsByTagName('script')[0]
  p.parentNode.insertBefore(s, p)
})(
  window,
  document,
  '//widgets.mango-office.ru/widgets/mango.js',
  'mango-js',
  'mgo'
)
mgo({calltracking: {id: 30374, elements: [{numberText: '74232026532'}]}})
