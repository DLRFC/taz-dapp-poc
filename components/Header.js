const Header = () => {
  return (
    <div className="mt-10 mb-10 flex items-end justify-between px-5">
      <div className="-rotate-90 transform text-xl">
        <h1>TEMP_RARY</h1>
        <h1 className="bg-black px-1 text-white">AN_NYMOUS</h1>
        <h1>Z_NE</h1>
      </div>
      <div className="flex flex-col items-end -mb-5">
        <p className="text-xs text-gray-500">DEVCON-BOGOTA</p>
        <p className="text-4xl font-bold">2022</p>
      </div>
    </div>
  )
}

export default Header
