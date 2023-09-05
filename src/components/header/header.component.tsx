import Link from "next/link"

interface Props {
  title: string
}

export const HeaderComponent = ({ title }: Props) => {
  return (
    <header className="bg-cyan-900 py-10 mb-10">
      <Link href="/">
        <h1 className="text-6xl text-center text-green-400">{title}</h1>
      </Link>
    </header>
  )
}
