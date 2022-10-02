import React from "react"


import ContentLoader from "react-content-loader"

const PizzaSkeleton = () => (
  <ContentLoader 
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="125" cy="125" r="125" /> 
    <rect x="0" y="261" rx="10" ry="10" width="280" height="28" /> 
    <rect x="10" y="415" rx="10" ry="10" width="95" height="30" /> 
    <rect x="125" y="405" rx="25" ry="25" width="152" height="45" /> 
    <rect x="0" y="300" rx="10" ry="10" width="280" height="87" />
  </ContentLoader>
)

export default PizzaSkeleton