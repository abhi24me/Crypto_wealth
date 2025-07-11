export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-primary"
      >
        <path
          d="M3 12L3 18C3 18.5304 3.21071 19.0391 3.58579 19.4142C3.96086 19.7893 4.46957 20 5 20L19 20C19.5304 20 20.0391 19.7893 20.4142 19.4142C20.7893 19.0391 21 18.5304 21 18L21 12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3 8L12 3L21 8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7 16H9"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15 16H17"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11 16H13"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="font-headline text-xl font-bold">Crypto Wealth</span>
    </div>
  );
}

export function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width="48px"
      height="48px"
    >
      <path
        fill="#FFC107"
        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
      />
      <path
        fill="#FF3D00"
        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
      />
      <path
        fill="#4CAF50"
        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.223,0-9.655-3.657-11.303-8H6.306C9.656,39.663,16.318,44,24,44z"
      />
      <path
        fill="#1976D2"
        d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.089,5.571l6.19,5.238C42.012,35.84,44,30.138,44,24C44,22.659,43.862,21.35,43.611,20.083z"
      />
    </svg>
  );
}

export function AppleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M16.293 14.293c-1.172 1.172-2.031 2.922-2.031 4.707 0 .422.047.828.141 1.234-.609.281-1.266.422-1.906.422-1.219 0-2.391-.656-3.469-1.547-1.359-1.125-2.813-2.672-2.813-4.828 0-2.438 1.406-3.844 3.328-3.844.891 0 1.969.469 2.578 1.172a.754.754 0 0 0 1.062 0c.328-.328.328-.86 0-1.187-1.125-1.125-2.344-1.781-3.844-1.781-2.344 0-4.641 1.734-4.641 4.641 0 3.328 2.344 5.391 3.938 6.469a4.48 4.48 0 0 0 3.14 1.266c.234 0 .422 0 .656-.047a5.52 5.52 0 0 0 4.219-4.219c.141-.562.188-1.125.188-1.687 0-2.063-.844-3.516-2.016-4.688zM15 2.25c-.234.047-1.406.422-2.531 1.547-1.031 1.031-1.734 2.531-1.734 3.938 0 .422.047.828.141 1.234.609.281 1.266.422 1.906.422 1.266 0 2.438-.656 3.516-1.547 1.313-1.078 2.719-2.578 2.719-4.688 0-.562-.234-1.5-.703-2.109-.656-.844-1.875-1.453-3.219-1.359z"></path>
    </svg>
  );
}
