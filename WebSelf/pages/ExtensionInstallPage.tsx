import { Link } from 'react-router-dom';

const ExtensionInstallPage = () => {
  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center text-center bg-gradient-to-b from-white to-blue-100 text-blue-800 px-4"
      style={{ fontFamily: `'Bungee', sans-serif` }}
    >
      <h1 className="text-6xl font-bold mb-4 drop-shadow-lg">WebSelf 확장 다운로드</h1>
      <h2 className="text-2xl mb-4 drop-shadow-sm">방문해 주셔서 감사합니다!</h2>
      <br/>
      <p className="text-lg mb-8">
        이 페이지는 WebSelf 크롬 확장 프로그램의 수동 설치 파일을 제공합니다.
        아래에서 직접 다운로드하고 설치 방법을 확인하세요.
      </p>

      <a
        href="../WebSelf-extension.zip"
        download
        className="bg-blue-600 text-white py-3 px-6 rounded-full hover:bg-blue-700 hover:scale-105 shadow-md transition-all mb-6"
      >
        👉 확장 프로그램 다운로드 (.zip)
      </a>

      <div className="mt-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md text-sm text-left">
        <h3 className="text-blue-700 font-bold mb-2 text-base">🔧 설치 방법</h3>
        <p className="text-gray-700 leading-relaxed">
          1. 크롬 주소창에 <code>chrome://extensions</code> 입력<br />
          2. 우측 상단의 <strong>[개발자 모드]</strong>를 활성화<br />
          3. <strong>[압축 해제된 확장 프로그램 로드]</strong> 클릭<br />
          4. 다운로드한 압축을 푼 폴더를 선택하면 설치 완료!
        </p>
      </div>

      <Link to="/" className="mt-8 text-blue-700 underline hover:text-blue-900">
        <button className="bg-blue-600 text-white py-3 px-6 rounded-full hover:bg-blue-700 hover:scale-105 shadow-md transition-all">
          Go home
        </button>
      </Link>
    </div>
  );
};

export default ExtensionInstallPage;
